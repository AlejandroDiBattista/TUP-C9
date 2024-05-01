const contactos = [
    { nombre: "Agustin", Apellido: "Inhigo", telefono: "4564897" },
  { nombre: "Maria", Apellido: "Gomez", telefono: "1234567" },
  { nombre: "Juan", Apellido: "Martinez", telefono: "9876543" },
  { nombre: "Luis", Apellido: "Rodriguez", telefono: "2345678" },
  { nombre: "Ana", Apellido: "Lopez", telefono: "8765432" },
  { nombre: "Pedro", Apellido: "Fernandez", telefono: "3456789" },
  { nombre: "Laura", Apellido: "Diaz", telefono: "7654321" },
  { nombre: "Carlos", Apellido: "Perez", telefono: "6789012" },
  { nombre: "Sofia", Apellido: "Sanchez", telefono: "5432198" },
  { nombre: "Mateo", Apellido: "Garcia", telefono: "8901234" },
  { nombre: "Camila", Apellido: "Ramirez", telefono: "4321890" },
  { nombre: "Diego", Apellido: "Alvarez", telefono: "9012345" },
  { nombre: "Valentina", Apellido: "Torres", telefono: "3210987" },
  { nombre: "Lucas", Apellido: "Flores", telefono: "6789012" },
  { nombre: "Martina", Apellido: "Benitez", telefono: "9876543" },
  { nombre: "Joaquin", Apellido: "Dominguez", telefono: "2345678" },
  { nombre: "Isabella", Apellido: "Vazquez", telefono: "8765432" },
  { nombre: "Juan Pablo", Apellido: "Moreno", telefono: "3456789" },
  { nombre: "Catalina", Apellido: "Hernandez", telefono: "7654321" },
  { nombre: "Gabriel", Apellido: "Mendoza", telefono: "6789012" }
    
 
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