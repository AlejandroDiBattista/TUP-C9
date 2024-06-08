
import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: 'Ana', apellido: 'Garcia', edad: 44, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Juan', apellido: 'Lopez', edad: 28, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Lourdes', apellido: 'Villareal', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Nahuel', apellido: 'Navarro', edad: 54, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Josefina', apellido: 'Del Valle', edad: 17, borrado: false, actualizado: Date.now() },

]

app.get('/personas', (req, res) => {
    const persActivo = datos.filter(persona => !persona.borrado);
    res.status(200).json(persActivo);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const persIndex = datos.findIndex(persona => persona.id === id);

        if (persIndex !== -1) {
            if (borrado) {
                datos[persIndex].borrado = true;
            } else {
                if (nombre) datos[persIndex].nombre = nombre;
                if (apellido) datos[persIndex].apellido = apellido;
                if (edad !== undefined) datos[persIndex].edad = edad;
            }
            datos[persIndex].actualizado = Date.now();
            return res.status(201).json(datos[persIndex]);
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
