// const express = require("express")
import express from "express"
import router from "./rutas.js"
import noCincos from "./midlerware.js"
import morgan from "morgan"

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log("Request received", req.method, req.url, req.body)
    console.log(res.header)
    next()
    console.log("Response sent",
        res.statusCode,
        res.statusMessage,
        res.getHeaders())
})

let productos = [
    { id: 1, precio: 200, nombre: "Coca Cola", cantidad: 10 },
    { id: 2, precio: 150, nombre: "Pepsi", cantidad: 10 },
    { id: 3, precio: 100, nombre: "Fanta", cantidad: 10 },
]
// REST 
// CRUD
// CREATE
app.get("/productos", (req, res) => {
    res.json(productos)
})

app.post("/productos", (req, res) => {
    let producto = req.body
    productos = [...productos, producto];
    res.header("X-Ouput", `EL valor fue`)
    res.json(producto)
})

app.delete("/productos/:id", (req, res) => {
    let id = req.params.id
    productos = productos.filter(producto => producto.id != id)
    res.json({ message: "Producto eliminado" })
}
)


app.use(noCincos)


//READ_ALL
// app.get("/personas", readAllPersonas);
// app.get("/personas/:id", readPersonas)
// app.post("/personas", createPersonas)
// app.put("/personas/:id", updatePersonas)
// app.delete("/personas/:id", deletePersonas)

// app.use("/personas", router)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
    console.log("http://localhost:3000")
})

