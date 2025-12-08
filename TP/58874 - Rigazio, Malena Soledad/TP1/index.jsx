const contactos = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', telefono: '(381) 123-4567'},
        { id: 2, nombre: 'Maria', apellido: 'Gomez', telefono: '(381) 123-4567'},
        { id: 3, nombre: 'Pedro', apellido: 'Gonzalez', telefono: '(381) 123-4567'},
        { id: 4, nombre: 'Ana', apellido: 'Fernandez', telefono: '(381) 123-4567'},
        { id: 5, nombre: 'Lucas', apellido: 'Rodriguez', telefono: '(381) 123-4567'},
        { id: 6, nombre: 'Carla', apellido: 'Lopez', telefono: '(381) 123-4567'},
        { id: 7, nombre: 'Jorge', apellido: 'Diaz', telefono: '(381) 123-4567'},
        { id: 8, nombre: 'Luis', apellido: 'Martinez', telefono: '(381) 123-4567'},
        { id: 9, nombre: 'Florencia', apellido: 'Paz', telefono: '(381) 123-4567'},
        { id: 10, nombre: 'Miguel', apellido: 'Rojas', telefono: '(381) 123-4567'},
        { id: 11, nombre: 'Sofia', apellido: 'Acosta', telefono: '(381) 123-4567'},
        { id: 12, nombre: 'Carlos', apellido: 'Vera', telefono: '(381) 123-4567'},
        { id: 13, nombre: 'Valeria', apellido: 'Gimenez', telefono: '(381) 123-4567'},
        { id: 14, nombre: 'Pablo', apellido: 'Sosa', telefono: '(381) 123-4567'},
        { id: 15, nombre: 'Romina', apellido: 'Rios', telefono: '(381) 123-4567'},
        { id: 16, nombre: 'Ezequiel', apellido: 'Molina', telefono: '(381) 123-4567'},
        { id: 17, nombre: 'Agustina', apellido: 'Ortiz', telefono: '(381) 123-4567'},
        { id: 18, nombre: 'Matias', apellido: 'Luna', telefono: '(381) 123-4567'},
        { id: 19, nombre: 'Cecilia', apellido: 'Carrizo', telefono: '(381) 123-4567'},
        { id: 20, nombre: 'Facundo', apellido: 'Paez', telefono: '(381) 123-4567'}
    ];
    
    const Contacto = ({ nombre, apellido, telefono }) => (
        <div class="contacto">
            <h3> {nombre} {apellido} </h3>
            <p> Telèfono: {telefono} </p>
        </div>
    );
    
    const Agenda = () => (
        <div>
            <h1>Mis Contactos</h1>
                {contactos.map(contacto => (
                    <Contacto
                        key={contacto.id}
                        nombre={contacto.nombre}
                        apellido={contacto.apellido}
                        telefono={contacto.telefono}
                    />
                ))}
        </div>
    );
    
    ReactDOM.render(<Agenda />, document.getElementById('root'));