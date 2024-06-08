import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: "Persona1", apellido: "Apellido1", edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Persona2", apellido: "Apellido2", edad: 35, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Persona3", apellido: "Apellido3", edad: 40, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Persona4", apellido: "Apellido4", edad: 45, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Persona5", apellido: "Apellido5", edad: 50, borrado: false, actualizado: Date.now() }
]

// GET_ALL
app.get('/personas', (req, res) => {
    const personasActivas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasActivas);
});

// PUT
app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id === undefined) {
        // If no ID provided, assign a new one
        const nuevaPersona = {
            id: datos.length + 1,
            nombre,
            apellido,
            edad,
            borrado: borrado || false,
            actualizado: Date.now()
        };
        datos.push(nuevaPersona);
        res.status(201).json({ id: nuevaPersona.id });
    } else {
        const index = datos.findIndex(persona => persona.id === id);
        if (index === -1) {
            res.status(404).send("Persona no encontrada");
        } else {
            if (borrado === true) {
                datos[index].borrado = true;
            } else {
                datos[index].nombre = nombre || datos[index].nombre;
                datos[index].apellido = apellido || datos[index].apellido;
                datos[index].edad = edad || datos[index].edad;
                datos[index].borrado = borrado || datos[index].borrado;
                datos[index].actualizado = Date.now();
            }
            res.status(201).json(datos[index]);
        }
    }
})

export default app
