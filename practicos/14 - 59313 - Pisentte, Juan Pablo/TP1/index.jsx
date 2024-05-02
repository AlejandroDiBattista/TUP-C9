const contactos = [
    {id:0, nombre: "Pablo",Apellido: "Perez" ,telefono: "12234"}, 
    {id:1, nombre: "Maria", Apellido: "Lopez" ,telefono: "987654"},
    {id:2, nombre: "Carlos", Apellido: "Gierre" ,telefono: "123123"},
    {id:3, nombre: "Ana", Apellido: "Perez" ,telefono: "321321"},
    {id:4, nombre: "Pedro", Apellido: "Gierre" ,telefono: "321321"},
    

]
const Contacto = ({nombre, Apellido, telefono}) => (
    <div className="contacto">
        <h2>{nombre} {Apellido}</h2>
        <p>Numero: {telefono}</p>
    </div>
)

const Agenda = () => (
    <div className="agenda">
        <h1>Agenda</h1>
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