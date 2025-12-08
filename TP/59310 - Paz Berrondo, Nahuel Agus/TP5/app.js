import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let personas = [
    { id: 1, nombre: 'María', apellido: 'Martínez', edad: 28, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Carlos', apellido: 'González', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Roberto', apellido: 'Sánchez', edad: 58, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Luis', apellido: 'Ramírez', edad: 22, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Miguel', apellido: 'Fernández', edad: 45, borrado: false, actualizado: Date.now() },
    { id: 6, nombre: 'Isabella', apellido: 'Rodríguez', edad: 21, borrado: false, actualizado: Date.now() },
];

app.get('/personas', (req, res) => {
    const obtenerPersonas = personas.filter(persona => !persona.borrado);
    res.status(200).json(obtenerPersonas);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const indicePersona = personas.findIndex(persona => persona.id === id);

        if (indicePersona !== -1) {
            if (borrado) {
                personas[indicePersona].borrado = true;
            } else {
                if (nombre) personas[indicePersona].nombre = nombre;
                if (apellido) personas[indicePersona].apellido = apellido;
                if (edad !== undefined) personas[indicePersona].edad = edad;
            }
            personas[indicePersona].actualizado = Date.now();
            return res.status(201).json(personas[indicePersona]);
        } else {
            return res.status(404).send('Persona no encontrada');
        }
    } else {
        const nuevoId = personas.length ? Math.max(...personas.map(persona => persona.id)) + 1 : 1;
        const nuevaPersona = {
            id: nuevoId,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };
        personas.push(nuevaPersona);
        return res.status(201).json(nuevaPersona);
    }
});

export default app;