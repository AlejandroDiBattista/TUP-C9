/// Variables por referencias.

// Las variables de tipo objeto almacenan referencias a un objeto en memoria.
// Los array son objetos

let a = [1, 2, 3]
Object.keys(a) //> ["0", "1", "2"]
Object.values(a) //> [1, 2, 3]

a.nombre = "Juan"
a //> [1, 2, 3, nombre: "Juan"]
Object.keys(a) //> ["0", "1", "2", "nombre"]

// Las variables de tipo objeto almacenan referencias a un objeto en memoria.

let b = a
b //> [1, 2, 3, nombre: "Juan"]
b.apellido = "Perez"

b //> [1, 2, 3, nombre: "Juan", apellido: "Perez"]
a //> [1, 2, 3, nombre: "Juan", apellido: "Perez"]

// Cuando cambio 'b' se cambi 'a' porque 'b' y 'a' apuntan al mismo objeto en memoria

// Para copiar un array se puede usar el método slice
b = a.slice()
b //> [1, 2, 3, nombre: "Juan", apellido: "Perez"]
b.apellido = "Gomez"
b //> [1, 2, 3, nombre: "Juan", apellido: "Gomez"]
a //> [1, 2, 3, nombre: "Juan", apellido: "Perez"]

let persona = { nombre: "Juan", apellido: "Perez" }

let numeros = [1, 2, 3]
let copia = [...numeros]
copia.push(100)
numeros //> [1, 2, 3]
copia //> [1, 2, 3, 100]

let otra = { ...persona }

// Modificar una propiedad de 'otra' no modifica 'persona'
otra.nombre = "Pedro"

otra = { ...persona, nombre: "Pedro" }

copia = [...numeros, 4, 5, 6]
copia //> [1, 2, 3, 4, 5, 6]

copia = [...numeros, ...numeros]
copia //> [1, 2, 3, 1, 2, 3]

copia = [100, ...numeros, 200, ...numeros, 300]
copia //> [100, 1, 2, 3, 200, 1, 2, 3, 300]
