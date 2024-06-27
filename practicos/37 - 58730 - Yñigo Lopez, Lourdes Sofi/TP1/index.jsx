const contactos = [
    { id: 1, nombre: "Dibu", apellido: "Martinez", telefono: 3814502923 },
    { id: 2, nombre: "Sofia", apellido: "Yñigo", telefono: 3814502924 },
    { id: 3, nombre: "Noemi", apellido: "Lopez", telefono: 3814502925 },
    { id: 4, nombre: "Julian", apellido: "Alvarez", telefono: 3814502926 },
    { id: 5, nombre: "Lionel", apellido: "Messi", telefono: 3814502927 },
    { id: 6, nombre: "Lautaro", apellido: "Martinez", telefono: 3814502928 },
    { id: 7, nombre: "Lionel", apellido: "Scaloni", telefono: 38145402929 },
    { id: 8, nombre: "Enzo", apellido: "Fernandez", telefono: 3814502930 },
    { id: 9, nombre: "Cuti", apellido: "Romero", telefono: 3814502931 },
    { id: 10, nombre: "Angel", apellido: "Di Maria", telefono: 3816402932 }
]

const Contacto = ({ nombre, apellido, telefono }) => (
    <div className="contacto">
        <h1>{nombre} {apellido}</h1>
        <p>Teléfono: {telefono} </p>
    </div>
)

const Agenda = () => (
    <div className="agenda">
        {
            contactos.map(contacto => <Contacto key={contacto.id}
                nombre={contacto.nombre}
                apellido={contacto.apellido}
                telefono={contacto.telefono}
            />)
        }
    </div>
)

const App = () => (
    <div>
        <Agenda />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))