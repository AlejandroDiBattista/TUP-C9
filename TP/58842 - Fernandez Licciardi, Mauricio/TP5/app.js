import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    {id:1, nombre:"Mauricio", apellido:"Fer Licc", edad:20, borrar: false, actualizar: Date.now()},
    {id:2, nombre:"Franco", apellido:"Mascia", edad:23, borrar: false, actualizar: Date.now()},
    {id:3, nombre:"Taylor", apellido:"Swift", edad:33, borrar: false, actualizar: Date.now()},
    {id:4, nombre:"Lionel", apellido:"Messi", edad:35, borrar: false, actualizar: Date.now()},
    {id:5, nombre:"Piero", apellido:"Nicolosi", edad:23, borrar: false, actualizar: Date.now()}
]

app.get('/personas', (req, res) => {
    res.status(200).json(datos.filter(persona => !persona.borrar))
});

app.put('/personas', (req, res) => {
    const{id, nombre, apellido, edad, borrar} = req.body

    if(id){
        const persona = datos.find(personas => personas.id === id)
        if (!persona) {
            return res.status(404).json({mensaje: "Persona no encontrada"})
        }

        Object.assign(persona, {
            nombre: nombre || personas.nombre,
            apellido: apellido || persona.apellido,
            edad: edad || persona.edad,
            borrar: borrar !== undefined? borrar: persona.borrar,
            actualizar: Date.now()
            })

            return res.status(201).json(persona)
        } else{
            const nuevaPersona ={
                id: datos.length ? Math.max(...datos.map(p => p.id)) +1 : 1,
                nombre, apellido, edad,
                borrar: false,
                actualizar: Date.now()
            }

            datos.push(nuevaPersona)

            res.status(201).json({id: nuevaPersona.id})
        }
})

export default app