// app.js
import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: 'Luis', apellido: 'Martinez', edad: 28, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Sofia', apellido: 'Perez', edad: 7, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Carlos', apellido: 'Gomez', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Lucia', apellido: 'Fernandez', edad: 22, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Pedro', apellido: 'Mendoza', edad: 40, borrado: false, actualizado: Date.now() }
]

app.get('/personas', (req, res) => {
    const personaAct = datos.filter(persona => !persona.borrado);
    res.status(200).json(personaAct);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const personaPricipal = datos.findIndex(persona => persona.id === id);

        if (personaPricipal !== -1) {
            if (borrado) {
                datos[personaPricipal].borrado = true;
            } else {
                if (nombre) datos[personaPricipal].nombre = nombre;
                if (apellido) datos[personaPricipal].apellido = apellido;
                if (edad !== undefined) datos[personaPricipal].edad = edad;
            }
            datos[personaPricipal].actualizado = Date.now();
            return res.status(201).json(datos[personaPricipal]);
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
