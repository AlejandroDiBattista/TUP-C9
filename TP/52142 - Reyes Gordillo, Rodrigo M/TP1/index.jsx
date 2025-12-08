function ContactCard(props) {
    return (
    <div className="contact-card">
        <h2>{props.nombre} {props.apellido}</h2>
        <p><strong>Teléfono:</strong> {props.telefono}</p>
    </div>
    );
}

const contacts = [
    { id: 1, nombre: 'Maxi', apellido: 'Reyes', telefono: '123-456-7890' },
    { id: 2, nombre: 'Vale', apellido: 'Arrieta', telefono: '987-654-3210' },
    { id: 2, nombre: 'Pedro', apellido: 'Pica Piedra', telefono: '3815-994-321' }
];

const App = () => {
    return (
    <div className="App">
        <h1>Agenda de Contactos</h1>
        <div className="contact-list">
        {contacts.map(contact => (
            <ContactCard key={contact.id} {...contact} />
        ))}
        </div>
    </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
