const contactos  = [
    {"id":1, nombre:"Valentina", apellido:"Hernandez", telefono:"456321"},
    {"id":0, nombre:"Mateo", apellido:"Gutierrez", telefono:"987654"},
    {"id":2, nombre:"Luis", apellido:"Santos", telefono:"123789"},
    {"id":3, nombre:"Fernanda", apellido:"Martinez", telefono:"654321"},
    {"id":4, nombre:"Diego", apellido:"Perez", telefono:"789654"},
    {"id":5, nombre:"Julia", apellido:"Diaz", telefono:"654987"},
    {"id":6, nombre:"Gabriel", apellido:"Torres", telefono:"321456"},
    {"id":7, nombre:"Romina", apellido:"Flores", telefono:"789123"},
    {"id":8, nombre:"Nicolas", apellido:"Alvarez", telefono:"654123"},
    {"id":9, nombre:"Sol", apellido:"Romero", telefono:"321987"},
    {"id":10, nombre:"Lucas", apellido:"Garcia", telefono:"456789"},
    {"id":11, nombre:"Catalina", apellido:"Rojas", telefono:"987321"},
    {"id":12, nombre:"Martin", apellido:"Lopez", telefono:"456987"},
    {"id":13, nombre:"Belen", apellido:"Mendez", telefono:"789654"},
    {"id":14, nombre:"Maximiliano", apellido:"Silva", telefono:"654789"},
    {"id":15, nombre:"Constanza", apellido:"Nuñez", telefono:"321654"},
    {"id":16, nombre:"Tomas", apellido:"Castro", telefono:"987456"},
    {"id":17, nombre:"Julieta", apellido:"Ortega", telefono:"654123"},
    {"id":18, nombre:"Felipe", apellido:"Ruiz", telefono:"123654"},
    {"id":19, nombre:"Abril", apellido:"Luna", telefono:"789321"}
    
]
const Contacto = ({nombre, apellido, telefono}) => (
    <div className="contacto">
        <h2>{nombre} {apellido}</h2>
        <p>Telefono: {telefono}</p>
    </div>
)

const Agenda = () => (
    <div>
        <h1>Agenda de contactos</h1>
        {contactos.map(contacto => (
            <Contacto nombre={contacto.nombre} 
            apellido={contacto.apellido} 
            telefono={contacto.telefono} />
        ))}
    </div>
)


ReactDOM.render(
<Agenda />, 
document.getElementById('root'))