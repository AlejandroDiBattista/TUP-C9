/// Booleanos | Valores lógicos | true o false 
// Resultado de operaciones de comparación


let verdadero = true
let falso = 1 > 2

// Operadores lógicos

let and = true && true  // Todos los valores deben ser true
let or = true || false  // Al menos un valor debe ser true
let not = !true         // Invierte el valor

// Short-circuit evaluation - Evaluación de cortocircuito | Evalúa solo lo necesario

let cortocircuito = true || console.log("No se ejecuta")

// Operadores de comparación
let igualdad = 1 == 1
let menor = 1 < 2
let mayorIgual = 2 >= 2

// Se consideran falso: false, 0, "", null, undefined, NaN
// Lo que no es falso es verdadero

true == 1
false == 0

true == "Hola"
true == "false"
let l = console.log

false == ""             //> true
l(false == null)       //> false
l(false == undefined)   //> false

// Comparación estricta
true === 1  // false | No hace coerción de tipos
true === "true" // false
