// app.js
import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: 'Laura', apellido: 'Garcia', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Carlos', apellido: 'Lopez', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Maria', apellido: 'Garcia', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Miguel', apellido: 'Garcia', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Sofia', apellido: 'Garcia', edad: 25, borrado: false, actualizado: Date.now() },

]

app.get('/personas', (req, res) => {
    const personasRegistradas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasRegistradas);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const personaInicial = datos.findIndex(persona => persona.id === id);

        if (personaInicial !== -1) {
            if (borrado) {
                datos[personaInicial].borrado = true;
            } else {
                if (nombre) datos[personaInicial].nombre = nombre;
                if (apellido) datos[personaInicial].apellido = apellido;
                if (edad !== undefined) datos[personaInicial].edad = edad;
            }
            datos[personaInicial].actualizado = Date.now();
            return res.status(201).json(datos[personaInicial]);
        } else {
            return res.status(404).send('Persona no encontrada');
        }
    } else {
        const nuevoID = datos.length ? Math.max(...datos.map(persona => persona.id)) + 1 : 1;
        const nuevaPersona = {
            id: nuevoID,
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
