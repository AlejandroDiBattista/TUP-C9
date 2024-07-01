/// Tipos simples (o primitivos)

// Numeros (number)

let numero = 1
console.log(numero)
console.log(typeof numero)

let enteros = 100
let decimales = 100.5
let negativos = -100
let exponente = 1e2
let hexadecimal = 0x100
let binario = 0b10001010

let separador = 1_000_000

// Operacions aritmeticas

let suma = 1 + 2
let resta = 1 - 2
let multiplicacion = 1 * 2
let division = 1 / 2
let modulo = 5 % 2

let expresion = 1 + 2 * 3   //> 7
let parentesis = (1 + 2) * 3 //> 9

let asociatividad = 8 / 4 / 2 //> 1
let precedencia = 8 / (4 / 2) //> 4

// Operadores de comparacion 

let igualdad = 1 == 1
let desigualdad = 1 != 2

let igualdadEstricta = 1 === 1
let desigualdadEstricta = 1 !== 2

let mayor = 2 > 1
let menor = 1 < 2
let mayorIgual = 2 >= 2

// Libreria Math

let absoluto = Math.abs(-1)
let redondeo = Math.round(1.5)      //> 2
let min = Math.min(1, 2, 3)         //> 1
let max = Math.max(1, 2, 3)         //> 3

let raiz = Math.sqrt(9)               //> 3

// JS no da error en division por cero
let divisionPorCero = 1 / 0          //> Infinity
let divisionPorCeroNegativa = -1 / 0 //> -Infinity

// JS no da error en operaciones invalidas
let noEsNumero = 0 / 0               //> NaN | Not a Number | No es un número


