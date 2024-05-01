const contactos = [
    { id: 0, nombre: "Nahuel", apellido: "Paz", telefono: "12515215" },
    { id: 1, nombre: "María", apellido: "González", telefono: "35464567" },
    { id: 2, nombre: "Juan", apellido: "Martínez", telefono: "78985645" },
    { id: 3, nombre: "Laura", apellido: "López", telefono: "98657432" },
    { id: 4, nombre: "Carlos", apellido: "Rodríguez", telefono: "12345678" },
    { id: 5, nombre: "Ana", apellido: "Fernández", telefono: "45678901" },
    { id: 6, nombre: "Pedro", apellido: "Sánchez", telefono: "78901234" },
    { id: 7, nombre: "Sofía", apellido: "Pérez", telefono: "23456789" }
];

const Contacto = ({ nombre, apellido, telefono}) => (
  <div className="contacto">
    <h3>{nombre} {apellido}</h3>
    <p>{telefono}</p>
  </div>
);

const Agenda = () => (
  <div>
    <h1>Contactos</h1>
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
