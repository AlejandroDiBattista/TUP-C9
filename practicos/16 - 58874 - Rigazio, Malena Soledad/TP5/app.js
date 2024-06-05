import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    //Datos de ejemplo

    {id: 1, nombre:"Malena", apellido:"Rigazio", edad: 19, borrado: false, actualizado: Date.now(1)},
    {id: 2, nombre:"Nazareno", apellido:"Marcote", edad: 21, borrado: false, actualizado: Date.now(2)},
    {id: 3, nombre:"Lautaro", apellido:"Diaz", edad: 21, borrado: false, actualizado: Date.now(3)},
    {id: 4, nombre:"Jennifer", apellido:"Lopez", edad: 20, borrado: false, actualizado: Date.now(4)},
    {id: 5, nombre:"Oliver", apellido:"Michi", edad: 22, borrado: false, actualizado: Date.now(5)},
    {id: 6, nombre:"Reina", apellido:"Pichi", edad: 20, borrado: false, actualizado: Date.now(6)},
    
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL

    res.json(datos)
});

app.put('/personas', (req, res) => {
    // Implementar PUT

    const { id, nombre, apellido, edad, borrado } = req.body; //Extrae los datos de la persona del cuerpo.

    if (id) { //Verifica un ID en la solicitud. La solicitud es para actualizar una persona existente.
        const personExistIndex = datos.findIndex(persona => persona.id === id); //Busca la persona utilizando su ID.
        if (personExistIndex === -1) {
            return res.status(404).json({ error: 'Esta persona no existe.' }); //Si no se encuentra, devuelve un codigo de estado 404.
        }

        return res.status(200).json(personDelete); //La solicitud indica que la persona debe ser borrada, se la elimina y se devuelve un estado 200.
        if (borrado === true) {
            const personDelete = datos.splice(personExistIndex, 1)[0]; 
            personDelete.borrado = true; 
        }

        const personExist = datos[personExistIndex];
        personExist.nombre = nombre;
        personExist.apellido = apellido;
        personExist.edad = edad;
        personExist.actualizado = Date.now();

        return res.status(201).json(personExist); //Devuelve la persona actualizada con un estado 201.
    } 
    else { //Crea un objeto de persona con un ID y los datos proporcionados.
        const newPerson = {
            id: Math.max(...datos.map(p => p.id), 0) + 1,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };

        datos.push(newPerson);
        return res.status(201).json(newPerson);
    }
})

export default app