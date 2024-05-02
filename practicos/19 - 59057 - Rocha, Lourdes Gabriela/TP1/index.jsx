

const contactos = [
    { id: 0, nombre: "Tomás", Apellido: "Sanchez", telefono: "246810" },
    { id: 1, nombre: "Ana", Apellido: "Brandan", telefono: "856986" },
    { id: 2, nombre: "Emilse", Apellido: "Farias", telefono: "924734" },
    { id: 3, nombre: "Mariana", Apellido: "Araoz", telefono: "098973" },
    { id: 4, nombre: "Sofia", Apellido: "Sanchez", telefono: "745638" },
    { id: 5, nombre: "Carlos", Apellido: "Brandan", telefono: "464756" },
    { id: 6, nombre: "Pablo", Apellido: "Rocha", telefono: "985774" },
    { id: 7, nombre: "Juan Ignacio", Apellido: "Rocha", telefono: "233560" },
    { id: 8, nombre: "Sofia", Apellido: "Lescano", telefono: "985492" },
    { id: 9, nombre: "Martin", Apellido: "Lopez", telefono: "209445" },
    { id: 10, nombre: "Nicolas", Apellido: "Ormachea", telefono: "384738" },
    { id: 11, nombre: "Agustin", Apellido: "Carrizo", telefono: "778432" },
    { id: 12, nombre: "Luciano", Apellido: "Sollazzo", telefono: "468200" }
  ];
  
  const Contacto = ({ nombre, Apellido, telefono }) => (
    <li className="tarjeta">
      <div className="nombre">{nombre} {Apellido}</div>
      <div className="telefono">Telefono: {telefono}</div>
    </li>
  );
  
  const Agenda = () => (
    <div className="agenda-container">
      <h1 id="A1">Agenda de contactos</h1>
      <ul className="agenda">
        {contactos.map(contacto => (
          <Contacto
            key={contacto.id}
            nombre={contacto.nombre}
            Apellido={contacto.Apellido}
            telefono={contacto.telefono}
          />
        ))}
      </ul>
    </div>
  );
  
  ReactDOM.render(<Agenda />, document.getElementById("root"));
  