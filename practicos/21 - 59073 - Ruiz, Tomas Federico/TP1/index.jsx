const nombre = "Juan"

const contactos = [
    {nombre: "Juan",Apellido: "Perez" ,telefono: "123456"}, 
    {nombre: "Ana", Apellido: "Lopez" ,telefono: "654321"}, 
    {nombre: "Pedro", Apellido: "Gomez" ,telefono: "456789"},
    {nombre: "Maria", Apellido: "Gonzalez" ,telefono: "987654"},
    {nombre: "Lucia", Apellido: "Rodriguez" ,telefono: "321654"},
    {nombre: "Carlos", Apellido: "Fernandez" ,telefono: "654987"},
    {nombre: "Sofia", Apellido: "Martinez" ,telefono: "789654"},
    {nombre: "Jorge", Apellido: "Sanchez" ,telefono: "654123"},
    {nombre: "Miguel", Apellido: "Lopez" ,telefono: "456321"},
    {nombre: "Valeria", Apellido: "Perez" ,telefono: "321456"},
    {nombre: "Florencia", Apellido: "Gomez" ,telefono: "654789"},
    {nombre: "Agustin", Apellido: "Gonzalez" ,telefono:"789321"},
    {nombre: "Camila", Apellido: "Rodriguez" ,telefono: "456987"},
    {nombre: "Ignacio", Apellido: "Fernandez" ,telefono: "987321"},
    {nombre: "Paula", Apellido: "Martinez" ,telefono: "321987"},
]
const Contacto = ({nombre, Apellido, telefono}) => (
    <div className="contactos">
        <h2>{nombre} {Apellido}</h2>
        <p>Telefono: {telefono}</p>
    </div>
)

const Agenda = () => (
    <div>
        <h1>Agenda de contactos</h1>
        {contactos.map(contacto => (
            <Contacto nombre={contacto.nombre} 
            Apellido={contacto.Apellido} 
            telefono={contacto.telefono} />
        ))}
    </div>
)


ReactDOM.render(
<Agenda />, 
document.getElementById('root'))