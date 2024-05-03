const contactos = [
    {nombre:"Valentina",apellido:"Caldez",telefono:"3812345678",gmail:"vcaldez13@gmail.com"},
    {nombre:"Luciano",apellido:"Fernández",telefono:"3813456789",gmail:"lucianofernandez@gmail.com"},
    {nombre:"Agustina",apellido:"Gómez",telefono:"3814567890",gmail:"agustinagomez@gmail.com"},
    {nombre:"Facundo",apellido:"Rodríguez",telefono:"3815678901",gmail:"facundorodriguez@gmail.com"},
    {nombre:"Santiago",apellido:"Díaz",telefono:"3816789012",gmail:"santiagodiaz@gmail.com"},
    {nombre:"Valentina",apellido:"Pérez",telefono:"3817890123",gmail:"valentinaperez@gmail.com"},
    {nombre:"Matías",apellido:"López",telefono:"3818901234",gmail:"matiaslopez@gmail.com"},
    {nombre:"Catalina",apellido:"Sánchez",telefono:"3819012345",gmail:"catalinasanchez@gmail.com"},
    {nombre:"Lautaro",apellido:"Romero",telefono:"3810123456",gmail:"lautaroromero@gmail.com"},
    {nombre:"Camila",apellido:"García",telefono:"3811234567",gmail:"camilagarcia@gmail.com"}
]

const Contacto = ({nombre, apellido, telefono, gmail, id}) => (
    <div className="contacto">
        <h3>{nombre} {apellido}</h3>
        <p className="telefono">Teléfono: {telefono}</p>
        <p className="gmail">Gmail: {gmail}</p>
        <p>id: {id}</p>
    </div>
)

const Agenda= () =>  (
    <div>
        <h1>LISTA DE CONTACTOS</h1>
       <div className="contactos">
        {contactos.map((contacto,index) => (
            <Contacto
                key={index} // Usar el índice como clave es adecuado en este caso porque no esperamos reordenar ni agregar / eliminar elementos
                nombre={contacto.nombre}
                apellido={contacto.apellido}
                telefono={contacto.telefono}
                gmail={contacto.gmail}
                id={index}
            />
        ))}
       </div>
    </div>
)

ReactDOM.render(<Agenda />, document.getElementById('root'))
