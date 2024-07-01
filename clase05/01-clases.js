//--- Creando objetos mediante una funcion ---//
function Persona(nombre, edad){
    return {
        nombre: nombre,
        edad: edad,

        mostrar: function(){
            console.log("Mostrar: ", this.nombre, this.edad)
        }
    }
}

var juan = newPersona('Juan', 30)
juan.mostrar()


//--- Creando objetos mediante una funcion constructora ---//

// Constructor con new
function Persona(nombre, edad){ // Omite "{}" y reemplaza por "this."
    this.nombre = nombre
    this.edad = edad

    this.mostrar = function(){
        console.log("Mostrar:", this.nombre, this.edad)
    }
}

var juan = new Persona('Juan', 30)  // new crea un objeto vacio y lo pasa como this
juan.mostrar()


//--- Creando objetos mediante una clase ---//

class Persona {
    constructor(nombre, edad){
        this.nombre = nombre
        this.edad   = edad
    }

    mostrar(){
        console.log("Mostrar: ", this.nombre, this.edad)
    }
}

var juan  = new Persona('Juan', 30)
juan.mostrar()

// 
