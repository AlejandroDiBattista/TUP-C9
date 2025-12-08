import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let personas = [
   {id: 1, nombre: 'Carlos', apellido: 'Hernandez', edad: 30, borrado: false, actualizado: 1},
   {id: 2, nombre: 'Ana', apellido: 'Martinez', edad: 25, borrado: false, actualizado: 2},
   {id: 3, nombre: 'Miguel', apellido: 'Sanchez', edad: 35, borrado: false, actualizado: 3},
   {id: 4, nombre: 'Elena', apellido: 'Diaz', edad: 28, borrado: false, actualizado: 4},
   {id: 5, nombre: 'Javier', apellido: 'Lopez', edad: 40, borrado: false, actualizado: 5}
]

let siguienteId = personas.length + 1;

app.get('/personas', (req, res) => {
    const personasActivas = personas.filter(p => !p.borrado);
    res.json(personasActivas);
});


app.put('/personas', (req, res) => {
    const nuevaPersona = req.body;

    if (nuevaPersona.id) {
        const indice = personas.findIndex(p => p.id === nuevaPersona.id);

        if (indice === -1) {
            return res.status(404).send();
        }

        personas[indice] = { ...personas[indice], ...nuevaPersona };

        if (nuevaPersona.borrado) {
            personas[indice].borrado = true;
        }

        return res.status(200).json(personas[indice]);

    } else {
        nuevaPersona.id = siguienteId++;
        nuevaPersona.borrado = false;
        nuevaPersona.actualizado = 1;

        personas.push(nuevaPersona);

        return res.status(201).json(nuevaPersona);
    }
});

export default app;
