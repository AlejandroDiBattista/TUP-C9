import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';

let cliente = new MongoClient(url);

async function main() {
    await cliente.connect()

    const db = cliente.db('tup-c9')
    const contactos = db.collection('contactos')
    
    // INSERT INTO contactos VALUES (3, 'Maria', 'Gomez', 'mg@gmail.com')

    let r1 = await contactos.insertOne({
       _id: 3,
       nombre: 'Maria',
       apellido: 'Gomez',
       email: 'mg@gmail.com',
       edad: 20,
       telefono: [
           {tipo: 'movil', numero: '123456789'},
           {tipo: 'fijo',  numero: '987654321'},
       ]
    })
    // SELECT * FROM contactos WHERE edad >= 18 AND edad <= 65
    let r2 = await contactos.find({ edad: { $gte: 18, $lte: 65 } }).toArray()

    // SELECT * FROM contactos 
    // WHERE 
    //    (sexo = "M" AND edad >= 18 AND edad <= 65) OR
    //    (sexo = "F" AND edad >= 18 AND edad <= 60)
    
    let r3 = await contactos.find(
        {
            "$or": [
                { "sexo": "M", "edad": { "$gte": 18, "$lte": 65 } },
                { "sexo": "F", "edad": { "$gte": 18, "$lte": 60 } }
            ]
        }
    ).toArray()

    let r4 = []
    for await (const c of contactos.find()) {
        r.push(c)
    }

    // UPDATE contactos SET edad = edad + 1 WHERE edad = 30
    await contactos.updateMany(
        { edad: 30 },
        { $inc: { edad: 1 } }
    )

    contactos.createIndex({ apellido: 1, nombre: 1 })
    // SELECT nombre, apellido, edad FROM contactos 
    //  WHERE edad = 20 
    //  ORDER BY apellido, nombre 
    //  LIMIT 10 
    //  OFFSET 10
    let r = await contactos
        .find({ edad: 20 })
        .sort({ apellido: 1, nombre: 1 })
        .limit(10)
        .skip(10)
        .project({ _id: 0, nombre: 1, apellido: 1, edad: 1 })
        .updateMany({ $inc: { edad: 1 } })
    
    // SELECT nombre, apellido, edad FROM contactos
    //    WHERE edad = 20
    //    ORDER BY apellido, nombre
    //    LIMIT 10
    //    OFFSET 10
    contactos.aggregate([
        { $match: { edad: 20 } },
        { $sort: { apellido: 1, nombre: 1 } },
        { $skip: 10 },
        { $limit: 10 },
        { $project: { _id: 0, nombre: 1, apellido: 1, edad: 1 } }
    ])
    
    console.log("Resultado",r)

    cliente.close()
}

main()