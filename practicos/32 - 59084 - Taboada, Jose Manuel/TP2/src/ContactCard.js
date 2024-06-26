// src/ContactCard.js
import React from 'react';
import './ContactCard.css';

const ContactCard = ({ contact, toggleFavorito }) => {
  return (
    <div className="contact-card">
      <div className="contact-header">
        <h3>{contact.nombre} {contact.apellido}</h3>
        <button onClick={() => toggleFavorito(contact.id)}>
          {contact.favorito ? '⭐' : '☆'}
        </button>
      </div>
      <p>Teléfono: {contact.telefono}</p>
    </div>
  );
};

export default ContactCard;

  