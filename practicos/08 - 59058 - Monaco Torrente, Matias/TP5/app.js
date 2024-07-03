import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: 'pedro pedro pedro', apellido: 'Pedro', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Ana', apellido: 'lisis', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'franca', apellido: 'saravia', edad: 2728, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'gaston', apellido: 'monaco', edad: 2, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Carlos', apellido: 'tercero', edad: 35, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    const personasActivas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasActivas);
});

app.put('/personas', (req, res) => {
    const nuevaPersona = req.body;

    if (!nuevaPersona.id) {
        // Corrección Asignar nuevo ID y agregar la persona a la base de datos
        const newId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        const personaConId = { ...nuevaPersona, id: newId, borrado: false, actualizado: Date.now() };
        datos.push(personaConId);
        res.status(201).json(personaConId);
    } else {
        // Corrección ctualizar persona existente
        const index = datos.findIndex(p => p.id === nuevaPersona.id);
        if (index !== -1) {
            datos[index] = { ...datos[index], ...nuevaPersona, actualizado: Date.now() };
            res.status(201).json(datos[index]);
        } else {
            res.status(404).json({ error: 'Persona no encontrada' });
        }
    }
});

export default app
