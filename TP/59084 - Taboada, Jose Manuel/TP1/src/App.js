import React from 'react';
import './App.css';

// Datos de ejemplo de la lista de contactos
const contactos = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '123-456-7890' },
  { id: 2, nombre: 'María', apellido: 'López', telefono: '234-567-8901' },
  { id: 3, nombre: 'Carlos', apellido: 'García', telefono: '345-678-9012' },
  { id: 4, nombre: 'Ana', apellido: 'Martínez', telefono: '456-789-0123' }
];

// Componente de tarjeta de contacto
const TarjetaContacto = ({ contacto }) => {
  return (
    <div className="tarjeta">
      <h2>{contacto.nombre} {contacto.apellido}</h2>
      <p>Teléfono: {contacto.telefono}</p>
    </div>
  );
};

// Componente principal
function App() {
  return (
    <div className="App">
      <h1>Agenda de Contactos</h1>
      <div className="lista-contactos">
        {contactos.map(contacto => (
          <TarjetaContacto key={contacto.id} contacto={contacto} />
        ))}
      </div>
    </div>
  );
}

export default App;
