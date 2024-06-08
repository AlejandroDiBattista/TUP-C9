import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: "Juan", apellido: "Perez", edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Maria", apellido: "Gomez", edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Carlos", apellido: "Rodriguez", edad: 35, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Ana", apellido: "Lopez", edad: 28, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Pedro", apellido: "Gonzalez", edad: 32, borrado: false, actualizado: Date.now() }
]

app.get('/personas', (req, res) => {
    let personas = datos.filter(persona => !persona.borrado)
    res.json(personas)
});

app.put('/personas', (req, res) => {
    let persona = req.body
    if (persona.id) {
        const index = datos.findIndex(p => p.id == persona.id)
        if (index !== -1) {
            datos[index] = { ...datos[index], ...persona }
            res.status(201).json(datos[index])
        } else {
            res.status(404).send('Persona no encontrada')
        }
    } else {
        const id = Math.max(...datos.map(p => p.id), 0) + 1;
        persona.id = id
        datos.push(persona)
        res.status(201).json(persona)
    }
})

export default app