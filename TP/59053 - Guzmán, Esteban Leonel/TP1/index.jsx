const App = () => (
  <div>
    <div className="header">
      <h1>Hola, Leonel</h1>
      <p>Bienvenido a tu agenda</p>
    </div>
    <div>
      <Agenda />
    </div>
  </div>
);


const contactos = [
  { id: 1, nombre: 'Juan', apellido: 'Perez', telefono: '3814567890' },
  { id: 2, nombre: 'María', apellido: 'González', telefono: '3817890123' },
  { id: 3, nombre: 'Pedro', apellido: 'Martínez', telefono: '3810123456' },
  { id: 1, nombre: 'Jose', apellido: 'Perez', telefono: '3816857474' },
  { id: 2, nombre: 'Manuel', apellido: 'González', telefono: '3817890123' },
  { id: 2, nombre: 'Juan', apellido: 'Ruiz', telefono: '3817890123' }
];

const Contacto = ({ nombre, apellido, telefono }) => (
  <div className="contacto">
    <h2>{nombre}, {apellido}</h2>
    <h3><b>Telefono:</b> {telefono}</h3>
  </div>
);

const Agenda = () => (
  <div className="presentacion">

    <div className="agenda">
      <h1>Agenda</h1>
      {contactos.map(contacto => (
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
