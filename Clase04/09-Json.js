/// Objetos compuestos | Objetos dentro de objetos | JSON

let persona = { // claves en su forma abreviada
    nombre: "Juan",
    apellido: "Perez",
    edad: 30,
    direccion: {
        calle: "Av. Libertador",
        numero: 1234,
        localidad: "CABA"
    }
}

persona.direccion.localidad //> "CABA"
persona.direccion.localidad = "Tucuman"

persona = { // claves en su forma completa
    "nombre": "Juan",
    "apellido": "Perez",
    "edad": 30,
    "direccion": {
        "calle": "Av. Libertador",
        "numero": 1234,
        "localidad": "CABA"
    }
}

json = JSON.stringify(persona);
console.log(json); //> {"nombre":"Juan","apellido":"Perez","edad":30,"direccion":{"calle":"Av. Libertador","numero":1234,"localidad":"CABA"}}

let punto = JSON.parse('{"x": 10, "y": 20}')
punto //> { x: 10, y: 20 }

let productos = [
    { id: 1, nombre: "Coca Cola", precio: 100 },
    { id: 2, nombre: "Pepsi", precio: 90 },
    { id: 3, nombre: "Sprite", precio: 80 },
    { id: 4, nombre: "Fanta", precio: 70}
]

productos[2].nombre //> "Sprite"
productos[2].precio //> 80

json = JSON.stringify(productos)
json //> '[{"id":1,"nombre":"Coca Cola","precio":100},{"id":2,"nombre":"Pepsi","precio":90},{"id":3,"nombre":"Sprite","precio":80},{"id":4,"nombre":"Fanta","precio":70}]'