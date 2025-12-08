const listContac= 
[
        {id: 1, nombre: "Lucas", apellido: "Saucedo", celular: "3813881288"},
        {id: 2, nombre: "María", apellido: "González", celular: "3875123456"},
        {id: 3, nombre: "Juan", apellido: "Martínez", celular: "3498765432"},
        {id: 4, nombre: "Ana", apellido: "Pérez", celular: "3512345678"},
        {id: 5, nombre: "Carlos", apellido: "López", celular: "3623456789"},
        {id: 6, nombre: "Laura", apellido: "Rodríguez", celular: "3819876543"},
        {id: 7, nombre: "Diego", apellido: "Hernández", celular: "3876543210"},
        {id: 8, nombre: "Marta", apellido: "Díaz", celular: "3587654321"},
        {id: 9, nombre: "José", apellido: "García", celular: "3812345678"},
        {id: 10, nombre: "Carolina", apellido: "Fernández", celular: "3876549876"},
        {id: 11, nombre: "Pedro", apellido: "Alvarez", celular: "3818765432"},
        {id: 12, nombre: "Sofía", apellido: "Romero", celular: "3876543120"},
        {id: 13, nombre: "Pablo", apellido: "Sánchez", celular: "3813456789"},
        {id: 14, nombre: "Valentina", apellido: "Torres", celular: "3878765432"},
        {id: 15, nombre: "Gabriel", apellido: "Ramírez", celular: "3811234567"},
        {id: 16, nombre: "Florencia", apellido: "Gómez", celular: "3872345678"},
        {id: 17, nombre: "Javier", apellido: "Luna", celular: "3816543210"},
        {id: 18, nombre: "Camila", apellido: "Moreno", celular: "3874567890"}
]

const Contacto = ({nombre, apellido, celular}) => (

        <div className="contacto">
            <h3>{nombre} {apellido}</h3>
            <p>Numero Personal: {celular}</p>
        </div>
    )

const Agenda = () =>(

        <div id="main">
            <h1> agenda de contactos</h1>
            {listContac.map((contacto) => (
                <Contacto 
                    nombre={contacto.nombre}
                    apellido={contacto.apellido}
                    celular={contacto.celular} />
            ))}
        </div>
    )

ReactDOM.render(<Agenda/>, document.getElementById('root'))