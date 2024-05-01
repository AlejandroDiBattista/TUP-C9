const contactos = [
    {id: 1, nombre: "Agustin", apellido: "Lopez", telefono: "123456789"},
    {id: 2, nombre: "Sofia", apellido: "Gutierrez", telefono: "987654321"},
    {id: 3, nombre: "Franco", apellido: "Sosa", telefono: "456789123"},
    {id: 4, nombre: "Tomas", apellido: "Ruiz", telefono: "123789456"},
    {id: 5, nombre: "Enzo", apellido: "Perez", telefono: "147258369"},
    {id: 6, nombre: "Nicolas", apellido: "Vallejo", telefono: "963852741"},
    {id: 7, nombre: "Tomas", apellido: "Sabra", telefono: "951753123"},
    {id: 8, nombre: "Pablo", apellido: "Pisentte", telefono: "159357456"},
]

const Contacto = ({nombre, apellido, telefono}) => (
    <div class="contactos">
        <h3>{nombre} <b>{apellido}</b></h3>
        <p>Teléfono: {telefono}</p>
    </div>
)

const Agenda = () => (
    <div>
        <h1 id="titulo">Agenda</h1>
        {contactos.map(contacto => (
            <Contacto
                nombre={contacto.nombre}
                apellido={contacto.apellido}
                telefono={contacto.telefono}
            />
        ))}
    </div>
)

ReactDOM.render(<Agenda/>, document.getElementById('root'))