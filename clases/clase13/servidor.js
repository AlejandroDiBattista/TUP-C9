import { MongoDbCliente } from './mongoDbCliente.js';

const cliente = new MongoDbCliente();
cliente.conectar('mongodb://localhost:27017', 'clase13');

db = cliente.getDatabase('contacto')

let resultado = await db.contactos.insertOne({
    nombre: 'Juan',
    apellido: 'Perez',
    telefono: '12345678'
});

console.log(resultado)


let cs = db.contactos.find({ edad: 30})

let r = []
for await (let c of cs) {
    r.push(c)
}

let cs1 = await db.contactos
            .find({ edad: 30 }).toArray()

