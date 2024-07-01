/// Estructura de control

// Ejecucion condicional | if | else | else if

let edad = 18
if(edad > 17){
    console.log("Es mayor de edad")
}

if(edad >= 18){
    console.log("Es mayor de edad")
} else {
    console.log("Es menor de edad")
}

if (edad < 10) {    // IF encadenados (if despues de otro if)
    console.log("Es un niño")
} else if(edad < 18){
    console.log("Es un adolescente")
} else if(edad < 40){
    console.log("Es un adulto")
} else {
    console.log("Es un adulto mayor")
}

let min 
let a = 10, b = 20, c = 5, d = 7

// Minimo de dos valores
if (a < b)          // Si tiene una sola linea no es necesario las llaves
    min = a;
else 
    min = b;

if (a < b) {
    min = a;
} else {
    min = b;
}

console.log(min)    //> 10

// Minimo de tres valores
if (a < b) {            // IF anidados (if dentro de otro if)
    // min a y c 
    if (a < c) {
        min = a;
    } else {
        min = b;
    }
} else {
    // min b y c
    if(b < c){
        min = b;
    } else {
        min = c;
    }
}

console.log(min)    //> 5

min = Infinity
if (a < min) min = a
if (b < min) min = b
if (c < min) min = c
if (d < min) min = d

/// Ejecucion iterativa | for | while | do while

let suma = 0, i = 0
while (i <= 10) {
    suma = suma + i // suma += i
    i = i + 1       // i += 1 | i++
}
suma //> 55

suma = 0
i = 0                   // for(i=0;;)
while (i <= 10) {       // for(;i<=10;)
    suma += i             
    i++                 // for(;;i++)
}

/// for(;;)
suma = 0
for (let i = 0; i <= 10; i++) {
    suma += i
}

let numeros = [1, 1, 3, 5, 8, 13, 21, 34, 55, 89]
suma = 0
for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i]
}
suma    //> 230

let pares = []
for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
        pares.push(numeros[i])
    }
}
pares   //> [8, 34]

let impares = []
for (let i = 0; i < numeros.length; i++) {
    let x = numeros[i]
    if (x % 2 !== 0) {
        impares.push(x)
    }
}
impares //> [1, 1, 3, 5, 13, 21, 55, 89]
impares = []
for (let x of numeros) {    // for of | Recorre los elementos de un array
    if (x % 2 !== 0) {
        impares.push(x)
    }
}
impares //> [1, 1, 3, 5, 13, 21, 55, 89]

let persona = { id: 1, nombre: "Juan", apellido: "Perez", edad: 25 }
let valores = Object.values(persona)

let claves = Object.keys(persona)
for (let clave of claves) {
    console.log(clave)
}

for (let clave in persona) {    // for in | Recorre las claves de un objeto
    console.log(clave)
}

console.log("> Recorriendo las claves y valores de un objeto")
for (let clave in persona) {
    let valor = persona[clave]
    console.log(`- ${clave}: ${valor}`)
}

// Iteracion de un array de objetos
let personas = [
    { id: 1, nombre: "Juan", apellido: "Perez", edad: 25 },
    { id: 2, nombre: "Maria", apellido: "Lopez", edad: 30 },
    { id: 3, nombre: "Carlos", apellido: "Gomez", edad: 35 }
]

for (let persona of personas) {
    console.log(`- ${persona.nombre} ${persona.apellido}`)
}

let mayores = []
for (let persona of personas) {
    if (persona.edad >= 30) {
        mayores.push(persona)
    }
}
mayores //> [ { id: 2, nombre: 'Maria', apellido: 'Lopez', edad: 30 }, 
//    { id: 3, nombre: 'Carlos', apellido: 'Gomez', edad: 35 } ]
        
let edades = []
for (let persona of personas) {
    edades.push(persona.edad)
}

edades //> [25, 30, 35]

let buscar = null 
for (let persona of personas) {
    if (persona.id === 2) {
        buscar = persona
        break
    }
}
buscar //> { id: 2, nombre: 'Maria', apellido: 'Lopez', edad: 30 }