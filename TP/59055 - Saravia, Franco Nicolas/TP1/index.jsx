const contacts = [
    { id: 1, nombre: 'Eduardo', apellido: 'Rodrigues', telefono: '123-456-789' },
    { id: 2, nombre: 'Elias', apellido: 'Sinsajo', telefono: '987-654-321' },
    { id: 3, nombre: 'Matias', apellido: 'Magdalena', telefono: '555-555-555' },
];

const ContactCard = ({ contact }) => (
    <div className="card">
        <h2>{contact.nombre} {contact.apellido}</h2>
        <p>Teléfono: {contact.telefono}</p>
    </div>
);

const App = () => (
    <div className="container">
        <h1>Agenda de Contactos</h1>
        {contacts.map(contact => (
            <ContactCard key={contact.id} contact={contact} />
        ))}
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
