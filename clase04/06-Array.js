/// Array | Tipos Compuestos

// Coleccion de datos ordenados

let array = [1, 2, 3, 4, 5]
console.log(array)  //> [1, 2, 3, 4, 5]

let vacio = []      //> []
let mixto = [1, "Juan", true] //> [1, "Juan", true]

// Acceso a elementos
let primero = array[0]                  //> 1
let ultimo = array[array.length - 1]    //> 5

// Modificación de elementos
array[0] = 0                    // Cambia el primer elemento
array[array.length - 1] = 6     // Cambia el último elemento

console.log(array)  //> [0, 2, 3, 4, 6]

// Propiedades
let longitud = array.length         //> 5
let esArray = Array.isArray(array)  //> true

// Métodos
array.push(7)       // Agrega un elemento al final
array //> [0, 2, 3, 4, 6, 7]
array.unshift(-1)   // Agrega un elemento al principio
array //> [-1, 0, 2, 3, 4, 6, 7]

let eliminado = array.pop() // Elimina el último elemento
array //> [-1, 0, 2, 3, 4, 6]
eliminado //> 7
eliminado = array.shift()  // Elimina el primer elemento
array //> [0, 2, 3, 4, 6]
eliminado //> -1

let cortado = array.slice(1, 4) // Copia los elementos desde la posición 1 a la 4
array //> [0, 2, 3, 4, 6]

let invertido = array.reverse() // Invierte el orden de los elementos
array //> [6, 4, 3, 2, 0]

let ordenado = array.sort() // Ordena los elementos
array //> [0, 2, 3, 4, 6]

let numeros = [10, 2, 5, 30, 4]
numeros.sort() //> [10, 2, 30, 4, 5]
numeros.sort((a, b) => a - b) // Ordena los elementos de menor a mayor
numeros //> [2, 4, 5, 10, 30]

let nombres = ["Juan", "Ana", "Pedro"]
nombres.sort() //> ["Ana", "Juan", "Pedro"]
