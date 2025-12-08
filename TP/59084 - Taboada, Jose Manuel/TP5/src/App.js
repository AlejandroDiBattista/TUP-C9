import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let personas = [
    { id: 1, nombre: "Carlos", apellido: "González", edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Luisa", apellido: "Hernández", edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Roberto", apellido: "López", edad: 40, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Elena", apellido: "Sánchez", edad: 35, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Sara", apellido: "Martín", edad: 28, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    res.json(personas);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const personaIndex = personas.findIndex(persona => persona.id === id);
        if (personaIndex === -1) {
            return res.status(404).json({ error: 'La persona no existe.' });
        }

        if (borrado === true) {
            const personaBorrada = personas.splice(personaIndex, 1)[0];
            personaBorrada.borrado = true;
            return res.status(200).json(personaBorrada);
        }

        personas[personaIndex].nombre = nombre;
        personas[personaIndex].apellido = apellido;
        personas[personaIndex].edad = edad;
        personas[personaIndex].actualizado = Date.now();

        return res.status(200).json(personas[personaIndex]);
    } else {
        const nuevaPersona = {
            id: Math.max(...personas.map(p => p.id), 0) + 1,
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

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});



 '/app.js';

App.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});