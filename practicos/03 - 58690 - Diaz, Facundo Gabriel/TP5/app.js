import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo   
    { id: 1, nombre: "Juan", apellido: "Perez", edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "María", apellido: "Gomez", edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Pedro", apellido: "Martinez", edad: 40, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Ana", apellido: "Diaz", edad: 35, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Laura", apellido: "Rodriguez", edad: 28, borrado: false, actualizado: Date.now() }

]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    res.json(datos)
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const personaExistenteIndex = datos.findIndex(persona => persona.id === id);
        if (personaExistenteIndex === -1) {
            return res.status(404).json({ error: 'La persona no existe.' });
        }

        if (borrado === true) {
            const personaBorrada = datos.splice(personaExistenteIndex, 1)[0]; 
            personaBorrada.borrado = true; 
            return res.status(200).json(personaBorrada); 
        }

        const personaExistente = datos[personaExistenteIndex];
        personaExistente.nombre = nombre;
        personaExistente.apellido = apellido;
        personaExistente.edad = edad;
        personaExistente.actualizado = Date.now();

        return res.status(201).json(personaExistente);
    } 
    else {
        const nuevaPersona = {
            id: Math.max(...datos.map(p => p.id), 0) + 1,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };

        datos.push(nuevaPersona);
        return res.status(201).json(nuevaPersona);
    }
});














export default app