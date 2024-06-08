import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 0, nombre: 'Marta', apellido: 'Wirth', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 1, nombre: 'Lucas', apellido: 'Rodriguez', edad: 28, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Carlos', apellido: 'Saucedo', edad: 24, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Juan', apellido: 'Perez', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Ana', apellido: 'Bolea', edad: 31, borrado: false, actualizado: Date.now() },
]

app.get('/personas', (req, res) => {
        const personaAct = datos.filter(persona => !persona.borrado);
        res.status(200).json(personaAct);
    });

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const personaIndex = datos.findIndex(persona => persona.id === id);

        if (personaIndex !== -1) {
            if (borrado) {
                datos[personaIndex].borrado = true;
            } else {
                if (nombre) datos[personaIndex].nombre = nombre;
                if (apellido) datos[personaIndex].apellido = apellido;
                if (edad !== undefined) datos[personaIndex].edad = edad;
            }
            datos[personaIndex].actualizado = Date.now();
            return res.status(201).json(datos[personaIndex]);
        } else {
            return res.status(404).send('Persona no encontrada');
        }
    } else {
        const nuevaId = datos.length ? Math.max(...datos.map(persona => persona.id)) + 1 : 1;
        const nuevaPersona = {
            id: nuevaId,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(nuevaPersona);
        return res.status(201).json(nuevaPersona);
    }
});

export default app