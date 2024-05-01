const Contactos = ({Id, nombre, apellido, telefono}) => (
    <div className="contacto">
        <h3>{nombre} {apellido}</h3>
        <p className="telefono">Teléfono: {telefono}</p>
        <p className="id">Id: {Id}</p>
    </div>
)

const App = ({nombre}) =>  (
    <div>
        <h1>Agenda</h1>
       <div id="contactos">
       <Contactos
        Id = "0"
        nombre = "Maria"
        apellido = "Fernandez"
        telefono="3817382758"
        />
        <Contactos
        Id = "1"
        nombre = "Juan"
        apellido = "Perez"
        telefono="381485758"
        />
        <Contactos
        Id = "2"
        nombre = "Pedro"
        apellido = "Lopez"
        telefono="381783945"
        />
        <Contactos
        Id = "3"
        nombre = "Martina"
        apellido = "Lopez"
        telefono="381794545"
        />
        <Contactos
        Id = "4"
        nombre = "Sofia"
        apellido = "Dilascio"
        telefono="381794545"
        />
        <Contactos
        Id = "5"
        nombre = "Andres"
        apellido = "Ruiz"
        telefono="381794545"
        />
        <Contactos
        Id = "6"
        nombre = "Rambo"
        apellido = "Yepura"
        telefono="381794545"
        />
        <Contactos
        Id = "7"
        nombre = "Joaquin"
        apellido = "Soria"
        telefono="381794545"
        />
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