import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo
    { id: 1, nombre: 'Juan', apellido: 'Perez', edad: 20, borrado: false, actualizado: Date.now()},
    { id: 2, nombre: 'Maria', apellido: 'Gomez', edad: 25, borrado: false, actualizado: Date.now()},
    { id: 3, nombre: 'Pedro', apellido: 'Gonzalez', edad: 30, borrado: false, actualizado: Date.now()},
    { id: 4, nombre: 'Ana', apellido: 'Fernandez', edad: 35, borrado: false, actualizado: Date.now()},
    { id: 5, nombre: 'Lucas', apellido: 'Rodriguez', edad: 40, borrado: false, actualizado: Date.now()},
    { id: 6, nombre: 'Carla', apellido: 'Lopez', edad: 45, borrado: false, actualizado: Date.now()},
    { id: 7, nombre: 'Jorge', apellido: 'Diaz', edad: 50, borrado: false, actualizado: Date.now()},
    { id: 8, nombre: 'Luis', apellido: 'Martinez', edad: 20, borrado: false, actualizado: Date.now()},
    { id: 9, nombre: 'Florencia', apellido: 'Paz', edad: 25, borrado: false, actualizado: Date.now()},
    { id: 10, nombre: 'Miguel', apellido: 'Rojas', edad: 30, borrado: false, actualizado: Date.now()},
    { id: 11, nombre: 'Sofia', apellido: 'Acosta', edad: 35, borrado: false, actualizado: Date.now()},
    { id: 12, nombre: 'Carlos', apellido: 'Vera', edad: 40, borrado: false, actualizado: Date.now()},
    { id: 13, nombre: 'Valeria', apellido: 'Gimenez',edad: 45, borrado: false, actualizado: Date.now()},
    { id: 14, nombre: 'Pablo', apellido: 'Sosa', edad: 50, borrado: false, actualizado: Date.now()},
    { id: 15, nombre: 'Romina', apellido: 'Rios', edad: 20, borrado: false, actualizado: Date.now()},
    { id: 16, nombre: 'Ezequiel', apellido: 'Molina', edad: 25, borrado: false, actualizado: Date.now()},
    { id: 17, nombre: 'Agustina', apellido: 'Ortiz', edad: 30, borrado: false, actualizado: Date.now()},
    { id: 18, nombre: 'Matias', apellido: 'Luna', edad: 35, borrado: false, actualizado: Date.now()},
    { id: 19, nombre: 'Cecilia', apellido: 'Carrizo', edad: 40, borrado: false, actualizado: Date.now()},
    { id: 20, nombre: 'Facundo', apellido: 'Paez', edad: 45, borrado: false, actualizado: Date.now()},
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