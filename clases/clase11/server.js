// const express = require("express")
import express from "express"

const app = express()

let datos = [
    { id: 1, nombre: "Juan", apellido: "Perez" },
    { id: 2, nombre: "Ana", apellido: "Gomez" },
    { id: 3, nombre: "Pedro", apellido: "Garcia" }
]

app.use(express.json())
app.use((req, res, next) => {
    console.log("Estoy en el medio")
    next()
})
//READ_ALL
app.get("/personas", (req, res) => {
    res.json(datos)
});

// READ:id
app.get("/personas/:id", (req, res) => {
    const id = req.params.id
    const persona = datos.find(p => p.id == id)
    if (persona) {
        res.json(persona)
    } else {
        res.status(404).send("Persona no encontrada")
    }
})

// CREATE
app.post("/personas", (req, res) => {
    const persona = req.body
    console.log("Datos Recibidos", persona)
    const id = Math.max(...datos.map(p => p.id))+1
    
    datos = [...datos, { ...persona, id }]
    res.json({id})
})

// UPDATE
app.put("/personas/:id", (req, res) => {
    const { id } = req.params
    
    const persona = req.body

    console.log("Datos Recibidos", persona)
    const index = datos.findIndex(p => p.id == id)
    if (index >= 0) {
        const anterior = datos[index]
        datos[index] = { ...anterior, ...persona }
        res.json(datos[index])
    } else {
        res.status(404).send("Persona no encontrada")
    }
})

// DELETE
app.delete("/personas/:id", (req, res) => {
    const { id } = req.params
    
    datos = datos.filter(p => p.id != id)
    res.send("Borrado Ok")
}
)


    app.listen(3000, () => {
        console.log("Server is running on port 3000")
        console.log("http://localhost:3000")
    })

