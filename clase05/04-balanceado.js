// tenemos una base de datos de contactos
let contactos = [
    { nombre: 'Marta', telefono: 123456789, edad: 30 },
    { nombre: 'Juan', telefono: 987654321, edad: 20 },
    { nombre: 'Pedro', telefono: 123123123, edad: 15 },
    { nombre: 'Ana', telefono: 321321321, edad: 25 },
]

// queremos filtrar los contactos que cumplan una condicion
function filtrar(lista, condicion) {
    let resultado = []
    for (let c of lista) {
        if (condicion(c)) {
            resultado.push(c)
        }
    }
    return resultado
}

let esMayor = contacto => contacto.edad >= 18
let mayores = filtrar(contactos, esMayor)
let menores = filtrar(contactos, c => c.edad < 18)

// JavaScript moderno nos permite hacerlo de una manera mas simple
let resultado = contactos.filter(contacto => contacto.edad >= 18)

// Las funciones son objetos de primera clase
let sumar = (a, b) => a + b
let aux = sumar // aux es una referencia a la funcion sumar

aux(1, 2)   // Equivalente a llamar a sumar
sumar(1, 2)

// Usando la funcion filtrar 
let nombres4 = filtrar(contactos, c => c.nombre.length == 4)

// Usando filter (permite encadenar funciones)
nombres4 = contactos
    .filter(c => c.nombre.length == 4)
    .sort(compararEdad)

// Comparador debe dar <0 , =0 o >0 si 'a' es menor, igual o mayor a 'b' respectivamente 
let compararEdad = (a, b) => a.edad - b.edad
    
contactos.sort(compararEdad)

// Para comparar por nombre se debe usar...
let compararNombre = (a, b) => {
    if (a.nombre < b.nombre) return -1
    if (a.nombre > b.nombre) return 1
    return 0
}

// o bien se puede usar el metodo localeCompare
let compararNombre2 = (a, b) => a.nombre.localeCompare(b.nombre)

contactos.sort(compararNombre)
contactos.sort(compararNombre2)

// Otra forma de hacerlo es usando una funcion anonima
contactos.sort((a, b) => a.nombre.localeCompare(b.nombre))
