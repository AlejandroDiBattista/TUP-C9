import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: "Ana", apellido: "Garcia", edad: 25, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Luis", apellido: "Perez", edad: 30, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Maria", apellido: "Lopez", edad: 35, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Juan", apellido: "Gomez", edad: 40, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Laura", apellido: "Martinez", edad: 45, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    const personas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personas);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id === undefined) {
        const newPerson = {
            id: datos.length ? datos[datos.length - 1].id + 1 : 1,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(newPerson);
        res.status(201).json({ id: newPerson.id });
    } else {
        const index = datos.findIndex(persona => persona.id === id);

        if (index === -1) {
            res.status(404).json({ error: 'Persona no encontrada' });
        } else {
            if (borrado === true) {
                datos[index] = { ...datos[index], borrado: true, actualizado: Date.now() };
            } else {
                datos[index] = {
                    ...datos[index],
                    nombre: nombre || datos[index].nombre,
                    apellido: apellido || datos[index].apellido,
                    edad: edad || datos[index].edad,
                    actualizado: Date.now()
                };
            }
            res.status(200).json(datos[index]);
        }
    }
});

export default app;
