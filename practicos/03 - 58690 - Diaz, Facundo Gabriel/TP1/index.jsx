const contacts = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', telefono: '123-456-7890' },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', telefono: '987-654-3210' },
    { id: 3, nombre: 'Luis', apellido: 'Lopez', telefono: '456-789-1234' },
    // Añade más contactos si es necesario
];

const ContactCard = ({ nombre, apellido, telefono }) => (
    <div className="card">
        <h2>{nombre} {apellido}</h2>
        <p>{telefono}</p>
    </div>
);

const App = () => (
    <div className="container">
        <h1>Mi Agenda</h1>
        {contacts.map(contact => (
            <ContactCard 
                key={contact.id}
                nombre={contact.nombre}
                apellido={contact.apellido}
                telefono={contact.telefono}
            />
        ))}
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
