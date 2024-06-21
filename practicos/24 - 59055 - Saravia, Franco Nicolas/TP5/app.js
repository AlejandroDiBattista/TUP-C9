import express from 'express';
import cors from 'cors';

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

let listaPersonas = [

    { identificador: 1, nombre: 'Gato', apellido: 'Loco', edad: 30, eliminado: false, actualizado: 1 },
    { identificador: 2, nombre: 'Matias', apellido: 'Monaco', edad: 25, eliminado: false, actualizado: 2 },
    { identificador: 3, nombre: 'Elias', apellido: 'Soraire', edad: 20, eliminado: false, actualizado: 3 },
    { identificador: 4, nombre: 'Gaston', apellido: 'Gracia', edad: 35, eliminado: false, actualizado: 4 },
    { identificador: 5, nombre: 'Luz', apellido: 'Cordoba', edad: 28, eliminado: false, actualizado: 5 },
    { identificador: 6, nombre: 'Maria', apellido: 'MAgdalena', edad: 40, eliminado: false, actualizado: 6 },
];
let idActual = listaPersonas.length + 1;

servidor.get('/personas', (req, res) => {

    const personasNoEliminadas = listaPersonas.filter(p => !p.eliminado);
    res.send(personasNoEliminadas);
});

servidor.put('/personas', (req, res) => {
  
    const persona = req.body;
    if (persona.identificador) {
        const indice = listaPersonas.findIndex(p => p.identificador === persona.identificador);
        if (indice === -1) {
            return res.status(404).send();
        }
        listaPersonas[indice] = { ...listaPersonas[indice], ...persona };
        return res.status(201).json(listaPersonas[indice]);
    } else {
        persona.identificador = idActual++;
        persona.eliminado = false;
        persona.actualizado = 1;
        listaPersonas.push(persona);
        return res.status(201).json(persona);
    }
});

export default servidor;
