let datos = [
    { id: 1, nombre: "Juan", apellido: "Perez" },
    { id: 2, nombre: "Ana", apellido: "Gomez" },
    { id: 3, nombre: "Pedro", apellido: "Garcia" }
]

function readPersonas(req, res) {
    const id = req.params.id
    const persona = datos.find(p => p.id == id)
    if (persona) {
        res.json(persona)
    } else {
        res.status(404).send("Persona no encontrada")
    }
}

function readAllPersonas(req, res) {
    res.status(201)
    res.json(datos)
}

function createPersonas(req, res) {
    const persona = req.body
    console.log("Datos Recibidos", persona)
    const id = Math.max(...datos.map(p => p.id)) + 1

    datos = [...datos, { ...persona, id }]
    res.json({ id })
}

function updatePersonas(req, res) {
    const { id } = req.params
    
    const persona = req.body

    console.log("Datos Recibidos", persona)
    const index = datos.findIndex(p => p.id == id)
    if (index >= 0) {
        const anterior = datos[index]
        datos[index] = { ...anterior, ...persona }
        res.json(datos[index])
    } else {
        res.status(404).send("Persona no encontrada")
    }
}

function deletePersonas(req, res){
    const { id } = req.params
    
    datos = datos.filter(p => p.id != id)
    res.send("Borrado Ok")
}
export { createPersonas, readPersonas, readAllPersonas, updatePersonas, deletePersonas}