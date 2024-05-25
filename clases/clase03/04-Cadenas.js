/// String (Cadena de caracteres)

let cadena = "Hola Mundo"
console.log(cadena)

let comillasDobles = "Hola Mundo"
let comillasSimples = 'Hola Mundo'

let comillasInvertidas = `Hola Mundo`   // Template literals - Interpolación de Cadenas
let interpolacion = `1 + 2 = ${1 + 2}`  //> "1 + 2 = 3"

let multilinea = `Linea 1
Linea 2
Linea 3`

// Funciones sobre cadenas

let longitud = cadena.length
let mayusculas = cadena.toUpperCase()
let minusculas = cadena.toLowerCase()

let caracter = cadena.charAt(0)                 //> "H"
let posicion = "Hola Mundo".indexOf("Mundo")    //> 5
let subcadena = cadena.substring(1, 4)          //> "ola"
let reemplazo = cadena.replace("Mundo", "Juan") //> "Hola Juan"
let division = "Juan,Perez".split(",")          //> ["Juan", "Perez"]

let empieza = cadena.startsWith("Hola") //> true
let termina = cadena.endsWith("Mundo")  //> true
let incluye = cadena.includes("la")     //> true

// Comparación de cadenas
"Juan" == "Juan" //> true
"Juan" == "juan" //> false  - Case sensitive
"juan" < "Juan"  //> false  // Las mayusculas estan antes 
let l = console.log

// Comparación de cadenas con acentos
l("á" > "a") //> true
