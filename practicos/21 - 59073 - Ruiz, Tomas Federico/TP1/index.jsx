

const contactos = [
    {id:0, nombre: "Juan",Apellido: "Perez" ,telefono: "123456"}, 
    {id:1, nombre: "Ana", Apellido: "Lopez" ,telefono: "654321"}, 
    {id:2,nombre: "Pedro", Apellido: "Gomez" ,telefono: "456789"},
    {id:3,nombre: "Maria", Apellido: "Gonzalez" ,telefono: "987654"},
    {id:4,nombre: "Lucia", Apellido: "Rodriguez" ,telefono: "321654"},
    {id:5,nombre: "Carlos", Apellido: "Fernandez" ,telefono: "654987"},
    {id:6,nombre: "Sofia", Apellido: "Martinez" ,telefono: "789654"},
    {id:7,nombre: "Jorge", Apellido: "Sanchez" ,telefono: "654123"},
    {id:8,nombre: "Miguel", Apellido: "Lopez" ,telefono: "456321"},
    {id:9,nombre: "Valeria", Apellido: "Perez" ,telefono: "321456"},
    {id:10,nombre: "Florencia", Apellido: "Gomez" ,telefono: "654789"},
    {id:11,nombre: "Agustin", Apellido: "Gonzalez" ,telefono:"789321"},
    {id:12,nombre: "Camila", Apellido: "Rodriguez" ,telefono: "456987"},
    {id:13,nombre: "Ignacio", Apellido: "Fernandez" ,telefono: "987321"},
    {id:14,nombre: "Paula", Apellido: "Martinez" ,telefono: "321987"},
    {id:15,nombre: "Facundo", Apellido: "Sanchez" ,telefono: "987456"},
    {id:16,nombre: "Santiago", Apellido: "Lopez" ,telefono: "456123"},
    {id:17,nombre: "Micaela", Apellido: "Perez" ,telefono: "123654"},
    {id:18,nombre: "Matias", Apellido: "Gomez" ,telefono: "789123"},
    {id:19,nombre: "Carolina", Apellido: "Gonzalez" ,telefono: "123789"},
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