const contactos = [
    { id: 1, nombre: "Santiago", Apellido: "Hernandez", telefono: "15935728" },
    { id: 2, nombre: "Marta", Apellido: "Ortiz", telefono: "74125896" },
    { id: 3, nombre: "Fernando", Apellido: "Perez", telefono: "12378945" },
    { id: 4, nombre: "Lucia", Apellido: "Gonzalez", telefono: "98712345" },
    { id: 5, nombre: "Ricardo", Apellido: "Lopez", telefono: "85296314" },
    { id: 6, nombre: "Sandra", Apellido: "Martinez", telefono: "96325874" },
    { id: 7, nombre: "Andres", Apellido: "Diaz", telefono: "74196385" },
    { id: 8, nombre: "Elena", Apellido: "Rodriguez", telefono: "45678912" },
    { id: 9, nombre: "Pablo", Apellido: "Sanchez", telefono: "78945612" },
    { id: 10, nombre: "Silvia", Apellido: "Mendez", telefono: "65478932" },
    { id: 11, nombre: "Manuel", Apellido: "Romero", telefono: "85274169" },
    { id: 12, nombre: "Alicia", Apellido: "Vega", telefono: "96374185" },
    { id: 13, nombre: "Francisco", Apellido: "Navarro", telefono: "78912346" },
    { id: 14, nombre: "Paula", Apellido: "Castro", telefono: "95135746" },
    { id: 15, nombre: "Gustavo", Apellido: "Morales", telefono: "75395128" },
    { id: 16, nombre: "Lorena", Apellido: "Ortega", telefono: "95175382" },
    { id: 17, nombre: "Victor", Apellido: "Cruz", telefono: "15975384" },
    { id: 18, nombre: "Rosa", Apellido: "Reyes", telefono: "35795128" },
    { id: 19, nombre: "Javier", Apellido: "Ramos", telefono: "12345678" }
]

const Contacto = ({ nombre, Apellido, telefono }) => (
    <div className="contactos">
        <h2>{nombre} {Apellido}</h2>
        <p>Telefono: {telefono}</p>
    </div>
)

const Agenda = () => (
    <div>
        <h1>Agenda de contactos</h1>
        {contactos.map(contacto => (
            <Contacto key={contacto.id} nombre={contacto.nombre}
                Apellido={contacto.Apellido}
                telefono={contacto.telefono} />
        ))}
    </div>
)

ReactDOM.render(
    <Agenda />,
    document.getElementById('root')
)
