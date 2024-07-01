const contactos = [
    { id: 1, nombre: "Franco", apellido: "Juarez", telefono: "16102797600" },
    { id: 2, nombre: "valentina", apellido: "Amin", telefono: "16103347690" },
    { id: 3, nombre: "laura", apellido: "Romero", telefono: "16106741401" },
    { id: 4, nombre: "Sofia", apellido: "Craven", telefono: "16163347391" },
    { id: 5, nombre: "Maria", apellido: "Giger", telefono: "16102337591" },
    { id: 7, nombre: "Samira", apellido: "Raimi", telefono: "16102347789" },
    { id: 8, nombre: "Mateo", apellido: "Del Toro", telefono: "16102347661" },
    { id: 9, nombre: "Lucia", apellido: "Jackson", telefono: "16106344691" },
];

const App = () => (
    <div>
        <h1>Lista de Contactos:</h1>
        {contactos.map(contacto => (
            <Contacto
                key={contacto.id}
                id={contacto.id}
                apellido={contacto.apellido}
                nombre={contacto.nombre}
                telefono={contacto.telefono}
            />
        ))}
    </div>
);

const Contacto = ({ id, nombre, apellido, telefono }) => (
    <div >
        <h3>{nombre} {apellido}</h3>
        <p><span >ID:</span> {id}</p>
        <p><span >Telefono:</span> {telefono}</p>
    </div>
)
ReactDOM.render(<App />, document.getElementById('root'))

