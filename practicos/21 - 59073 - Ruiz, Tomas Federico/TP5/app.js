
import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: 'Ana', apellido: 'Garcia', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Juan', apellido: 'Lopez', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Maria', apellido: 'Perez', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Pedro', apellido: 'Gomez', edad: 40, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Luis', apellido: 'Gonzalez', edad: 45, borrado: false, actualizado: Date.now() }
    
    
]

app.get('/personas', (req, res) => {
    const personasActivas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasActivas);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const personaIndex = datos.findIndex(persona => persona.id === id);

        if (personaIndex !== -1) {
            if (borrado) {
                datos[personaIndex].borrado = true;
            } else {
                if (nombre) datos[personaIndex].nombre = nombre;
                if (apellido) datos[personaIndex].apellido = apellido;
                if (edad !== undefined) datos[personaIndex].edad = edad;
            }
            datos[personaIndex].actualizado = Date.now();
            return res.status(201).json(datos[personaIndex]);
        } else {
            return res.status(404).send('Persona no encontrada');
        }
    } else {
        const newId = datos.length ? Math.max(...datos.map(persona => persona.id)) + 1 : 1;
        const newPersona = {
            id: newId,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(newPersona);
        return res.status(201).json(newPersona);
    }
});

export default app
