const contacto = [
    { id: 1, nombre: 'José', apellido: 'Díaz', telefono: '3813343450' },
    { id: 2, nombre: 'Emanuel', apellido: 'Pablo', telefono: '381456324' },
    { id: 3, nombre: 'Luciano', apellido: 'Perez', telefono: '381345324' },
    { id: 4, nombre: 'Luciana', apellido: 'Romano', telefono: '381334332' },
    { id: 5, nombre: 'Rocio', apellido: 'Díaz', telefono: '3813957843' },
    { id: 5, nombre: 'Fabiana', apellido: 'Lopez', telefono: '3812345833' },
    { id: 5, nombre: 'Tyler', apellido: 'Joseph', telefono: '3817367842' },
    { id: 5, nombre: 'Nova', apellido: 'Carlos', telefono: '3813951234' },
];

const App = () => (
    <div>
        <h1 className="titulo">Agenda de Contactos</h1>
        <div className="contactos">
            {contacto.map(contacto => (
                <Agenda key={contacto.id} contacto={contacto} />
            ))}
        </div>
    </div>
);

const Agenda = ({ contacto }) => (
    <div className="tarjeta">
        <h2> {contacto.id}. {contacto.nombre} {contacto.apellido}</h2>
        <p> <strong>Nombre: </strong><span className="cursiva">{contacto.nombre}</span></p>
        <p> <strong>Apellido: </strong><span className="cursiva">{contacto.apellido}</span></p>
        <p> <strong>Telefono: </strong><span className="cursiva"> {contacto.telefono}</span></p>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'))