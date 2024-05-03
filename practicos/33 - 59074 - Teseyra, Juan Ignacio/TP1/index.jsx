const db = [
    {
        id:0, nombre: "Gonzalo ", apellido:"Martinez", telefono: "13061993"    
    },
    {
        id:1, nombre: "Lucas", apellido:"Pratto", telefono: "3061989"    
    },
    {
        id:2, nombre: "Juan Fernando", apellido:"Quintero", telefono: "18011993"
    },
    {
        id:3, nombre: "Gonzalo", apellido:"Montiel", telefono: "111997"
    }
]

const Contacto = ({nombre, apellido, telefono}) => (
    <div class="tarjetaContacto">
        <p>{nombre}</p> <p>{apellido}</p>
        <p>Teléfono: {telefono}</p>
    </div>
)



const Agenda = () =>  (
    <div >
        <h1>Agenda</h1>
        <div className="container">
        {db.map(contacto => (
                <Contacto
                    nombre = {contacto.nombre}
                    apellido = {contacto.apellido}
                    telefono = {contacto.telefono}
                />
                    
            ))
        }
        </div>
        
    </div>
)

ReactDOM.render(<Agenda />, document.getElementById('root'))