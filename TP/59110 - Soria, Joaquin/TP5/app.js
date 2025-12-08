import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: "Lucas", apellido: "Araoz", edad: 15, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Pedro", apellido: "Jose", edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Samuel", apellido: "De Luque", edad: 30, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Andres", apellido: "Shushiu", edad: 23, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Maria", apellido: "Del Valle", edad: 65, borrado: false, actualizado: Date.now() }
]

app.get('/personas', (req, res) => {
    let personas = datos.filter(persona => !persona.borrado)
    res.json(personas)
});

app.put('/personas', (req, res) => {
    let persona = req.body;
    let index = datos.findIndex(p => p.id == persona.id);
    
    if (persona.id && index !== -1) {
        Object.assign(datos[index], persona);
        res.status(201).json(datos[index]);
    } else if (persona.id) {
        res.status(404).send('persona no encontrada');
    } else {
        persona.id = Math.max(...datos.map(p => p.id), 0) + 1;
        datos.push(persona);
        res.status(201).send(persona);
    }
});


export default app