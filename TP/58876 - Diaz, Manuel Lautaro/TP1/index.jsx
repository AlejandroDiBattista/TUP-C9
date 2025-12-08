const contacts = [
    { id: 1, nombre: "Juan", apellido: "Pérez", telefono: "123-456-7890" },
    { id: 2, nombre: "Ana", apellido: "García", telefono: "234-567-8901" },
    { id: 3, nombre: "Luis", apellido: "Martínez", telefono: "345-678-9012" },
    { id: 4, nombre: "María", apellido: "Rodríguez", telefono: "456-789-0123" }
];

const ContactCard = ({ contact }) => (
    <div className="contact-card">
        <h2>{contact.nombre} {contact.apellido}</h2>
        <p>Teléfono: {contact.telefono}</p>
    </div>
);

const App = () => (
    <div>
        <h1>Agenda de Contactos</h1>
        <div className="contact-list">
            {contacts.map(contact => (
                <ContactCard key={contact.id} contact={contact} />
            ))}
        </div>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
