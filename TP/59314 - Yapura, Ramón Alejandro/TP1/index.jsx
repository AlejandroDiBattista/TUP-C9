const contactos = [
    {nombre: "Alejandro", apellido: "Yapura", telefono: "3815763886"},
    {nombre: "Maria" , apellido: "Fernandez", telefono: "3815943758"},
    {nombre: "Juan", apellido:"Perez", telefono:"381485758"},
    {nombre: "Pedro", apellido: "Lopez", telefono:"381783945"},
    {nombre: "Joaquin", apellido: "Soria", telefono:"381384758"},
    {nombre: "Jose", apellido: "Gonzalez", telefono:"381481458"},
    {nombre: "Ana", apellido: "Martinez", telefono: "3817654321"},
    {nombre: "Luis", apellido: "Rodriguez", telefono: "3819876543"},
    {nombre: "Sofia", apellido: "Dilascio", telefono: "3815643219"},
    {nombre: "Diego", apellido: "Torres", telefono: "3813219236"},
    {nombre: "Laura", apellido: "Ramirez", telefono: "3817132234"}
]

const Contacto = ({id, nombre, apellido, telefono}) => (
    <div className="contacto">
        <h3>{nombre} {apellido}</h3>
        <p className="telefono">Teléfono: {telefono}</p>
        <p className="id">id:{id}</p>
    </div>
)

const App = () =>  (
    <div>
        <h1>Agenda</h1>
       <div id="contactos">
        {contactos.map((contacto, index) => (
            <Contacto
                nombre={contacto.nombre}
                apellido={contacto.apellido}
                telefono={contacto.telefono}
                id={index}
            />
        ))}
       </div>
       <h2>Tarjeta Presentación</h2>
       <div style={{display: "flex", justifyContent: "center"}}>
            <div id="tarjeta">
            <p><b>Ramón Alejandro Yapura</b></p>
            <p>Teléfono:3815763886</p>
            </div>
        </div>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))