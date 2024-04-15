// Objetos | Colecciones de datos no ordenados
// Cada elemento tiene una clave y un valor

let nombre = "Juan"
let apellido = "Perez"

function nombreCompleto(nombre, apellido) {
  return `${nombre} ${apellido}`
}

nombreCompleto("Juan", "Perez")     //> "Juan Perez"

let persona = {
    nombre: "Juan",
    apellido: "Perez",
}

// Acceder a las propiedades
persona.nombre //> "Juan"
persona.apellido //> "Perez"

// Modificar propiedades
persona.nombre = "Pedro"
persona.apellido = "Gomez"

persona     //> { nombre: "Pedro", apellido: "Gomez" }

// Agregar propiedades
persona.edad = 30
persona     //> { nombre: "Pedro", apellido: "Gomez", edad: 30 }

// Eliminar propiedades
delete persona.edad
persona     //> { nombre: "Pedro", apellido: "Gomez" }

// Propiedades con espacios o caracteres especiales
persona["nombre completo"] = "Pedro Gomez"
persona     //> { nombre: "Pedro", apellido: "Gomez", "nombre completo": "Pedro Gomez" }

persona.nombre === persona["nombre"] //> true
// Sintasis punto vs corchetes

persona = {
    "nombre": "Juan",
    "apellido": "Perez",
    "edad": 30
}

// Métodos
Object.keys(persona) //> ["nombre", "apellido", "edad"]
Object.values(persona) //> ["Juan", "Perez", 30]

Object.entries(persona) //> [["nombre", "Juan"], ["apellido", "Perez"], ["edad", 30]]

let puntos = { x: 10, y: 20, x: 30 }
Object.keys(puntos) //> ["x", "y"]
Object.values(puntos) //> [30, 20]
Object.entries(puntos) //> [["x", 30], ["y", 20]]



