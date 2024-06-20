import express from "express";
import cors from "cors";

const aplicacion = express();

aplicacion.use(express.json());
aplicacion.use(cors());

let datos = [
  {
    id: 1,
    nombre: "Gaston",
    apellido: "Villa",
    edad: 45,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 2,
    nombre: "Matias",
    apellido: "Monaco",
    edad: 21,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 3,
    nombre: "Bruno",
    apellido: "Aguirre",
    edad: 34,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 4,
    nombre: "Luciana",
    apellido: "Frias",
    edad: 30,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 5,
    nombre: "Lourdes",
    apellido: "Rocha",
    edad: 55,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 6,
    nombre: "Tomas",
    apellido: "Sanchez",
    edad: 63,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 7,
    nombre: "Marcos",
    apellido: "Silva",
    edad: 29,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 8,
    nombre: "Ana",
    apellido: "Martinez",
    edad: 45,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 9,
    nombre: "Diego",
    apellido: "Fernandez",
    edad: 22,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 10,
    nombre: "Gabriela",
    apellido: "Mendez",
    edad: 38,
    actualizado: 0,
    borrado: false,
  },
];

const obtenerPersonaPorId = (idPersona) => {
  return datos.find((persona) => persona.id === idPersona && !persona.borrado);
};

aplicacion.get("/personas/:id", (req, res) => {
  try {
    const { id } = req.params;
    const persona = obtenerPersonaPorId(parseInt(id));
    if (persona) {
      res.json(persona);
    } else {
      res.status(404).json({ mensaje: "Persona no encontrada" });
    }
  } catch (error) {
    console.log("Error en obtenerPersonaPorId", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

const actualizarPersona = (idPersona, nuevosDatos) => {
  const indice = datos.findIndex((persona) => persona.id === idPersona);
  if (indice !== -1) {
    datos[indice] = { ...datos[indice], ...nuevosDatos };
    datos[indice].actualizado++;
    return datos[indice];
  } else {
    return null;
  }
};

aplicacion.put("/personas/:id", (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;
    const personaActualizada = actualizarPersona(parseInt(id), nuevosDatos);
    if (personaActualizada) {
      res.status(201).json(personaActualizada);
    } else {
      res.status(404).json({ mensaje: "Persona no encontrada" });
    }
  } catch (error) {
    console.log("Error en actualizarPersona", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


aplicacion.get("/personas", (req, res) => {
  try {
    const datosFiltrados = datos.filter((dato) => !dato.borrado);
    res.send(datosFiltrados);
  } catch (error) {
    console.log("Error en Implementar GET_ALL", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

aplicacion.put("/personas", (req, res) => {
  try {
    const dato = req.body;
    if (dato.id === undefined) {
      const nuevoId = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1;
      dato.id = nuevoId;
      datos.push(dato);
      res.status(201).json(dato);
    } else {
      const indice = datos.findIndex((persona) => persona.id == dato.id);
      if (indice !== -1) {
        datos[indice] = { ...datos[indice], ...dato };
        res.status(201).json(datos[indice]);
      } else {
        res.status(404).json({ mensaje: "Dato inexistente o no encontrado" });
      }
    }
  } catch (error) {
    console.log("Error en Implementar PUT", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default aplicacion;
