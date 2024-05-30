// const express = require("express")
import express from "express"
import router from "./rutas.js"
import noCincos from "./midlerware.js"
import morgan from "morgan"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use((req, res, next) => {
    console.log("Request received", req.method, req.url, req.body)
    console.log(res.header)
    next()
    console.log("Response sent", 
    res.statusCode, 
    res.statusMessage, 
    res.getHeaders())
})

app.use(noCincos)


//READ_ALL
// app.get("/personas", readAllPersonas);
// app.get("/personas/:id", readPersonas)
// app.post("/personas", createPersonas)
// app.put("/personas/:id", updatePersonas)
// app.delete("/personas/:id", deletePersonas)

app.use("/personas", router)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
    console.log("http://localhost:3000")
})

