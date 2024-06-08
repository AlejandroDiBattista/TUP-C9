import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: "Juan", apellido: "Perez", edad: 17, borrado: false, actualizado: Date.now()},
    { id: 2, nombre: "Ana", apellido: "Gomez", edad: 19, borrado: false, actualizado: Date.now()},
    { id: 3, nombre: "Andres", apellido: "Ruiu", edad: 23, borrado: false, actualizado: Date.now()},
    { id: 4, nombre: "Joaquin", apellido: "Soria", edad: 19, borrado: false, actualizado: Date.now()},
    { id: 5, nombre: "Valeria", apellido: "Caldez", edad: 25, borrado: false, actualizado: Date.now()},
]

app.get('/personas', (req, res) => {
    let personas = datos.filter(persona => !persona.borrado)
    res.json(personas)
});

app.put('/personas', (req, res) => {
    let persona = req.body
    let id = persona.id
    let index = datos.findIndex(p => p.id == id)
    if (id && index !== -1) {
        datos[index] = {...datos[index], ...persona}
        res.status(201).json(datos[index])
    } else if (id) {
        res.status(404).send('Persona no encontrada')
    } else {
        id = Math.max(...datos.map(p => p.id), 0) + 1
        persona.id = id
        datos.push(persona)
        res.status(201).json(persona)
    }
})

export default app