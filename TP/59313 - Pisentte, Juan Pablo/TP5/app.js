import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: 'Ana', apellido: 'Garcia', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Juan', apellido: 'Lopez', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Franco', apellido: 'Perez', edad: 55, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Tomas', apellido: 'Luz', edad: 20, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Sergio', apellido: 'Leal', edad: 42, borrado: false, actualizado: Date.now() },
    { id: 6, nombre: 'Franchesca', apellido: 'Laurrel', edad: 18, borrado: false, actualizado: Date.now() },

]

app.get('/personas', (req, res) => {
    const SujetoActivo = datos.filter(persona => !persona.borrado);
    res.status(200).json(SujetoActivo);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const sujetoIndex = datos.findIndex(persona => persona.id === id);

        if (sujetoIndex !== -1) {
            if (borrado) {
                datos[sujetoIndex].borrado = true;
            } else {
                if (nombre) datos[sujetoIndex].nombre = nombre;
                if (apellido) datos[sujetoIndex].apellido = apellido;
                if (edad !== undefined) datos[sujetoIndex].edad = edad;
            }
            datos[sujetoIndex].actualizado = Date.now();
            return res.status(201).json(datos[sujetoIndex]);
        } else {
            return res.status(404).send('Persona no encontrada');
        }
    } else {
        const newId = datos.length ? Math.max(...datos.map(persona => persona.id)) + 1 : 1;
        const newPersona = {
            id: newId,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(newPersona);
        return res.status(201).json(newPersona);
    }
});

export default app
