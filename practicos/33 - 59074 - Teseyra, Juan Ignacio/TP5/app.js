import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo 
    {id: 1, nombre: 'Tobias', apellido: 'Velazquez', edad:'20', borrado: false, actualizado: Date.now()},
    {id: 2, nombre: 'Jesus', apellido: 'Roldan', edad:'19', borrado: false, actualizado: Date.now()},
    {id: 3, nombre: 'Agustin', apellido: 'Romano', edad:'26', borrado: false, actualizado: Date.now()},
    {id: 4, nombre: 'Riki', apellido: 'Cabeza', edad:'24', borrado: false, actualizado: Date.now()},
    {id: 5, nombre: 'Juancho', apellido: 'Calvente', edad:'26', borrado: false, actualizado: Date.now()},  
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    const personasOn = datos.filter(persona =>!persona.borrado)
    res.status(200).json(personasOn)
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const {id, nombre, apellido, edad, borrado} = req.body

    if(id){
        const personaIndex = datos.findIndex(persona => persona.id===id)
        if (personaIndex !== -1){
            if(borrado)
                datos[personaIndex] = true
            else{
                if(nombre) datos[personaIndex].nombre = nombre;
                if(apellido) datos[personaIndex].apellido = apellido;
                if(edad !== undefined) datos[personaIndex].edad = edad;
            }
            datos[personaIndex].actualizado = Date.now();
            return res.status(201).json(datos[personaIndex]);    
        }else{
            const nuevaId = datos.length ? Math.max(...datos.map(persona => persona.id)) +1 :1;
            const nuevaPersona = {
                id: nuevaId, nombre, apellido, edad, borrado:false, actualizado:Date.now(),
            }
        }
        datos.push(nuevaPersona);
        return res.status(201).json(nuevaPersona);
    }
})

export default app