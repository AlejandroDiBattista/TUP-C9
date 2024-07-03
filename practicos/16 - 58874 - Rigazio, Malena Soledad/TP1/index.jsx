
const contactos = [
    {id: 1, nombre:"Malena", apellido:"Rigazio", telefono: "123456789"},
    {id: 2, nombre:"Nazareno", apellido:"Marcote", telefono: "987654321"},
    {id: 3, nombre:"Lautaro", apellido:"Diaz", telefono: "321654987"},
    {id: 4, nombre:"Jennifer", apellido:"Lopez", telefono: "111222333"},
    {id: 5, nombre:"Oliver", apellido:"Reina",telefono: "444555666"}
];

const Contacto = ({nombre, apellido, telefono}) => (
    <div className="contacto">
        <h2> {nombre} {apellido} </h2>
        <p> Teléfono: {telefono} </p>
    </div>
);

const Agenda = () => (
    <div>
        <h1>Agenda</h1>
        {contactos.map(contacto => (
            <Contacto
            key = {contacto.id}
            nombre = {contacto.nombre}
            apellido = {contacto.apellido}
            telefono = {contacto.telefono}
            />
        ))}
    </div>
);

ReactDOM.render(<Agenda />, document.getElementById('root'));
