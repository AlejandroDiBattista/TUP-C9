import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo   
    {id: 1, nombre:'Lucas', apellido:'Rodriguez', edad: 54, borrado: false, actualizado:1},
    {id: 2, nombre:'Lucas', apellido:'Rodriguez', edad: 54,borrado: false, actualizado:2},
    {id: 3, nombre:'Lucas', apellido:'Rodriguez', edad: 54,borrado: false, actualizado:3},
    {id: 4, nombre:'Lucas', apellido:'Rodriguez', edad: 54,borrado: false, actualizado:4},
    {id: 5, nombre:'Lucas', apellido:'Rodriguez', edad: 54,borrado: false, actualizado:5}
]

let idActual = datos.length + 1;

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    const personasNoBorradas= datos.filter(p => !p.borrado)
    res.send(personasNoBorradas)
    res.send(datos)
    
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const persona = req.body
    if (persona.id){
        const index = datos.findIndex(persona => persona.id === req.body.id)

        if (index === -1){
    return res.status(404).send()
}
    datos[index]= {...datos[index],...persona}
    return res.status(201).json(datos[index])
    } else {
        persona.id= idActual++
    persona.borrado= false
    persona.actualizado= 1
    datos.push(persona)
    return res.status(201).json(persona)
    }
    
})

export default app