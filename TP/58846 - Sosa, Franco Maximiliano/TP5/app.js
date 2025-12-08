// app.js
import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: 'Ana', apellido: 'Garcia', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Juan', apellido: 'Lopez', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Jose', apellido: 'Toranzo', edad: 23, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Agostina', apellido: 'Fernandez', edad: 66, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Agustina', apellido: 'Sosa', edad: 25, borrado: false, actualizado: Date.now() },
    
    
]

app.get('/personas', (req, res) => {
    const personasActivas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasActivas);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const IndicePersonaIndex = datos.findIndex(persona => persona.id === id);

        if (IndicePersonaIndex !== -1) {
            if (borrado) {
                datos[IndicePersonaIndex].borrado = true;
            } else {
                if (nombre) datos[IndicePersonaIndex].nombre = nombre;
                if (apellido) datos[IndicePersonaIndex].apellido = apellido;
                if (edad !== undefined) datos[IndicePersonaIndex].edad = edad;
            }
            datos[IndicePersonaIndex].actualizado = Date.now();
            return res.status(201).json(datos[IndicePersonaIndex]);
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
