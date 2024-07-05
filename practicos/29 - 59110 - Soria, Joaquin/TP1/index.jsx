
const contactos = [
	{ nombre: 'El Sapo', apellido: 'Pepe', telefono: '3812346543', gmail: 'ElSapoPepe@gmail.com' },
	{ nombre: 'Lucas', apellido: 'Ruiu', telefono: '3814342567', gmail: 'LucasRuiu222@gmail.com' },
	{ nombre: 'Ignacio', apellido: 'Ruiz', telefono: '3814567422', gmail: 'IgnacioRuiz24@gmail.com' },
	{ nombre: 'Tobias', apellido: 'Cuca', telefono: '3815465457', gmail: 'TobiasCuca2022@gmail.com' },
	{ nombre: 'Andres', apellido: 'Caldez', telefono: '3815325242', gmail: 'AndresCaldezelpro@gmail.com' },
	{ nombre: 'Ramón', apellido: 'El Dios', telefono: '3819999999', gmail: 'RamonElDios@gmail.com' },
	{ nombre: 'Valentina', apellido: 'Yepure', telefono: '3813243542', gmail: 'ValentinaYepure@gmail.com' },
	{ nombre: 'Marta', apellido: 'Reinoiso', telefono: '3813453678', gmail: 'MartaReinoso@gmail.com' },
	{ nombre: 'Jose Luis', apellido: 'De los vayes', telefono: '3814534563', gmail: 'JoseLuisDelosvayes@gmail.com' },
];

const Contacto = ({ nombre, apellido, telefono, gmail, id }) => (
    <div className="contacto">
        <h3>{nombre} {apellido}</h3>
        <p className="telefono">Teléfono: {telefono}</p>
        <p className="gmail">gmail: {gmail}</p>
        <p>id: {id}</p>
    </div>
)

const Agenda = () => (
    <div>
        <h1>Agenda De Los Usuarios</h1>
        <div className="contactos">
            {contactos.map((contacto, index) => (
                <Contacto
                    nombre={contacto.nombre}
                    apellido={contacto.apellido}
                    telefono={contacto.telefono}
                    gmail={contacto.gmail}
                    id={index}
                />
            ))}
        </div>
        <h2>Datos Personales</h2>
        <div className="clase">
            <div className="Yo">
                <h3>Joaquin Soria</h3>
                <h3>3875631514</h3>
                <h3>Joaquinsoria78@gmail.com</h3>
            </div>
        </div>
    </div>
)

ReactDOM.render(<Agenda />, document.getElementById('root'))