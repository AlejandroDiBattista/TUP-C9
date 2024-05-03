const contactos = [
    {id:1, nombre: "Agustin", Apellido: "Inhigo", telefono: "4564897" },
  { id:2,nombre: "Maria", Apellido: "Gomez", telefono: "1234567" },
  { id:3,nombre: "Juan", Apellido: "Martinez", telefono: "9876543" },
  { id:4,nombre: "Luis", Apellido: "Rodriguez", telefono: "2345678" },
  { id:5,nombre: "Ana", Apellido: "Lopez", telefono: "8765432" },
  { id:6,nombre: "Pedro", Apellido: "Fernandez", telefono: "3456789" },
  { id:7,nombre: "Laura", Apellido: "Diaz", telefono: "7654321" },
  {id:7, nombre: "Carlos", Apellido: "Perez", telefono: "6789012" },
  { id:8,nombre: "Sofia", Apellido: "Sanchez", telefono: "5432198" },
  { id:9,nombre: "Mateo", Apellido: "Garcia", telefono: "8901234" },
  { id:10,nombre: "Camila", Apellido: "Ramirez", telefono: "4321890" },
  { id:11,nombre: "Diego", Apellido: "Alvarez", telefono: "9012345" },
  { id:12,nombre: "Valentina", Apellido: "Torres", telefono: "3210987" },
  { id:13,nombre: "Lucas", Apellido: "Flores", telefono: "6789012" },
  { id:14,nombre: "Martina", Apellido: "Benitez", telefono: "9876543" },
  { id:15,nombre: "Joaquin", Apellido: "Dominguez", telefono: "2345678" },
  { id:16,nombre: "Isabella", Apellido: "Vazquez", telefono: "8765432" },
  { id:17,nombre: "Juan Pablo", Apellido: "Moreno", telefono: "3456789" },
  { id:18,nombre: "Catalina", Apellido: "Hernandez", telefono: "7654321" },
  { id:19,nombre: "Gabriel", Apellido: "Mendoza", telefono: "6789012" }
    
 
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