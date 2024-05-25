// Programacion Orientada a Objetos en JavaScript


// Agenda es una clase que contiene una lista de contactos
class Agenda {
    constructor() {
        this.contactos = [];
    }

    agregar(contacto){
        this.contactos.push(contacto);
    }

    buscar(nombre){
        return this.contactos.filter(c => c.contiene(nombre));
    }
}

// Contacto es una clase que representa una persona con nombre, apellido, telefonos y domicilios
class Contacto {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefonos = [];
        this.domicilios = [];
    }

    nombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }

    iniciales () {
        return `${this.nombre[0]}${this.apellido[0]}`;
    }

    email(){    //Simula un email
        return this.nombre[0]+this.apellido+"@mail.com"
    }

    contiene(texto){    // Busca el texto en el contacto (nombre, apellido, email, iniciales, telefonos y domicilios)
        return this.nombreCompleto().includes(texto) 
            || this.email().includes(texto) || this.iniciales() === texto
            || this.telefonos.some(t => t.contiene(texto))
            || this.domicilios.some(d => d.contiene(texto));
    
    }

    agregarTelefono(telefono) {
        this.telefonos.push(telefono);
    }

    agregarDomicilio(domicilio) {
        this.domicilios.push(domicilio);
    }
}	

// Teléfono es una clase que representa un numero de teléfono y su tipo
class Telefono {
    constructor(numero, tipo='celular') {
        this.numero = numero;
        this.tipo = tipo;
    }

    contiene(texto){    // Busca el texto en el teléfono (numero o tipo)
        return this.numero.includes(texto)
            || this.tipo.includes(texto);
    }
}	

// Domicilio es una clase que representa una dirección
class Domicilio {
    constructor(calle, numero, localidad="SM de Tucuman") {
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
    }

    contiene(texto){    // Busca el texto en el domicilio (calle, numero o localidad)
        return this.calle.includes(texto)
            || this.numero.includes(texto)
            || this.localidad.includes(texto);
    }
}

let juan = new Contacto('Juan', 'Perez');

juan.agregarTelefono(new Telefono('3811234567'));
juan.agregarTelefono(new Telefono('3817654321', 'fijo'));

juan.agregarDomicilio(new Domicilio('Mendoza', 123));
juan.agregarDomicilio(new Domicilio('San Martin', 456, 'Yerba Buena'));

console.log(juan);

// Acceso a los atributos de un contacto
juan.nombre = 'Juan Carlos';
juan.telefonos.length //> 2

juan.telefonos[1].tipo = "celular"
juan.domicilios[1].localidad = "Tafi Viejo" // Cambia la localidad del domicilio 1 del contacto

let maria = new Contacto('Maria', 'Lopez');
maria.agregarTelefono(new Telefono('3819876543'));
maria.agregarDomicilio(new Domicilio('25 de Mayo', 123));

let agenda = new Agenda();
agenda.agregar(juan);
agenda.agregar(maria);
agenda.agregar(new Contacto('Jorge', 'Lopez'));

console.log(agenda);
let j = agenda.buscar('Juan');
console.log(j)

console.log("Contactos que contienen 'Lopez'")
for(let contacto of agenda.buscar('Lopez')){
    console.log(contacto.nombreCompleto())
}

console.log("Contactos que contienen '381'")
for(let contacto of agenda.buscar('381')){
    console.log(contacto.nombreCompleto())
}