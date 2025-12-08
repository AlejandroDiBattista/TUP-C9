import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: "Juan", apellido: "Pérez", edad: 30 },
    { id: 2, nombre: "Ana", apellido: "Gómez", edad: 25 },
    { id: 3, nombre: "Carlos", apellido: "López", edad: 35 },
    { id: 4, nombre: "María", apellido: "Rodríguez", edad: 28 },
    { id: 5, nombre: "Luis", apellido: "Martínez", edad: 40 },
    { id: 6, nombre: "Laura", apellido: "Fernández", edad: 22 } 
]

app.get('/personas', (req, res) => {
    const pNoBorradas = datos.filter(p=> !p.borrado)
    res.json(pNoBorradas)
});

app.put('/personas', (req, res) => {
    const persona = req.body;
    const id = persona.id;   

    if (!id){
        const newId = Math.max(...datos.map(p=> p.id)) + 1
        persona.id = newId
        datos.push(persona)
        res.json(persona)
    }
    else {
        const index = datos.findIndex (p => p.id == id)
        if (index >= 0) {
            if(persona.borrado === true ){
                datos[index].borrado = true;
            }
            else {
                datos[index] = {...datos[index], ...persona}
            }
            res.json(datos[index])
        }
        else {
            datos.push(persona)
            res.json(persona)
        }
    }
})

export default app