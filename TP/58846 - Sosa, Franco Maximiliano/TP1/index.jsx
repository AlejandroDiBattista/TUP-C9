const contactos = [
    {id:0, Nombre: "Franco",Apellido: "Perez" , celular: "123454126"}, 
    {id:1, Nombre: "Ana", Apellido: "Lopez" , celular: "65432881"}, 
    {id:2,Nombre: "Matias", Apellido: "Benitez" , celular: "4567849"},
    {id:3,Nombre: "Rodrigo", Apellido: "Toranzo" , celular: "988854"},
    {id:4,Nombre: "Julio", Apellido: "Rodriguez" , celular: "3211654"},
    {id:5,Nombre: "Agostina", Apellido: "Fernandez" , celular: "6454987"},
    {id:6,Nombre: "Sofia", Apellido: "Martinez" , celular: "749654"},
    {id:7,Nombre: "Florencia", Apellido: "Sanchez" , celular: "6543"},
    {id:8,Nombre: "Luciana", Apellido: "Lopez" , celular: "45632211"},
    {id:9,Nombre: "Valeria", Apellido: "Paez" , celular: "321454"},
    {id:10,Nombre: "Martin", Apellido: "Gomez" , celular: "6789"},
    {id:11,Nombre: "Agustin", Apellido: "Gonzalez" , celular:"78931"},
    {id:12,Nombre: "Camila", Apellido: "Alvarez" , celular: "456987"},
    {id:13,Nombre: "Ignacio", Apellido: "Ledesma" , celular: "9872321"},
    {id:14,Nombre: "Paula", Apellido: "Ledesma" , celular: "32947"},
    {id:15,Nombre: "Facundo", Apellido: "Sosa" , celular: "9456"},
    {id:16,Nombre: "Santiago", Apellido: "Morales" , celular: "456123"},
    {id:17,Nombre: "Micaela", Apellido: "Perez" , celular: "14234654"},
    {id:18,Nombre: "Matias", Apellido: "Gomez" , celular: "7829123"},
    {id:19,Nombre: "Martina", Apellido: "Yapura" , celular: "12543789"},
]
const Contacto = ({nombre, Apellido, celular}) => (
    <div className="contactos">
        <h2>{nombre} {Apellido}</h2>
        <p>Celular: {celular}</p>
    </div>
)

const Agenda = () => (
    <div>
        <h1>Agenda de contactos</h1>
        {contactos.map(contacto => (
            <Contacto nombre={contacto.Nombre} 
            Apellido={contacto.Apellido} 
            celular={contacto.celular} />
        ))}
    </div>
)


ReactDOM.render(
<Agenda />, 
document.getElementById('root'))
