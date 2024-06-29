// src/App.js
import React, { useState } from 'react';
import './App.css';
import ContactCard from './ContactCard';

function App() {
  const [contacts, setContacts] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '123-456-789', favorito: false },
    { id: 2, nombre: 'María', apellido: 'González', telefono: '987-654-321', favorito: false },
    { id: 3, nombre: 'Pedro', apellido: 'Martínez', telefono: '456-789-123', favorito: false },
  ]);

  const toggleFavorite = (id) => {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, favorito: !contact.favorito } : contact
    ));
  };

  const sortedContacts = [...contacts]
    .sort((a, b) => a.apellido.localeCompare(b.apellido) || a.nombre.localeCompare(b.nombre))
    .sort((a, b) => b.favorito - a.favorito);

  return (
    <div className="App">
      <h1>Agenda de Contactos</h1>
      <div className="contact-list">
        {sortedContacts.map(contact => (
          <ContactCard key={contact.id} contact={contact} toggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
}

export default App;
