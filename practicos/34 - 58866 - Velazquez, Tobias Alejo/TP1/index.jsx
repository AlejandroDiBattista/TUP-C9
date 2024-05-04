const App = () => (
  <div>
    <h1>Â¡Hola, mundo!</h1>
    <p>Â¡Bienvenidos a React!</p>
    <Agenda />
  </div>
);

const db = [
  { id: 0, nombre: "Tobias", apellido: "Velazquez", telefono: "381000000" },
  { id: 1, nombre: "Jesus", apellido: "Fortnite", telefono: "381111111" },
  { id: 2, nombre: "Juani", apellido: "la bestia", telefono: "387222222" },
  { id: 3, nombre: "Yayo", apellido: "uwu", telefono: "381333333" },
  { id: 3, nombre: "Agustin", apellido: "tstststs", telefono: "381444444" }
];

const Contacto = ({ nombre, apellido, telefono }) => (
  <div className="tarjetaContacto">
    <p>{nombre} {apellido}</p>
    <p>TelÃ©fono: {telefono}</p>
  </div>
);

const Agenda = () => (
  <div>
    <h1>Agenda contactos</h1>
    <div className="container">
      {db.map(contacto => (
        <Contacto
          key={contacto.id}
          nombre={contacto.nombre}
          apellido={contacto.apellido}
          telefono={contacto.telefono}
        />
      ))}
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
