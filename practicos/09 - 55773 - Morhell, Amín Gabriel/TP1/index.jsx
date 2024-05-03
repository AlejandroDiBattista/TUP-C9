
const Contacto = ({nombre, apellido, telefono}) => (
    <div>
      <h3>{nombre} <b>{apellido}</b></h3>
      <p>Telefono: {telefono}</p>

    </div>
  );

const contactos = [
  { id: 1, nombre: 'Pedro', apellido: 'Sanchez', telefono: '123456789' },
  { id: 2, nombre: 'Emilio', apellido: 'Montenegro', telefono: '987654321' },
  { id: 3, nombre: 'Jose', apellido: 'López', telefono: '555444333' }
];

const Agenda = () => (
  <div id='main'>
      <h1>Agenda</h1>
     {contactos.map(contacto => (
      
     <Contacto 
        key={contacto.id}
        nombre= {contacto.nombre}
        apellido={contacto.apellido}
        telefono={contacto.telefono}/>
     ))}
  </div>
);

ReactDOM.render(<Agenda />, document.getElementById('root'));
