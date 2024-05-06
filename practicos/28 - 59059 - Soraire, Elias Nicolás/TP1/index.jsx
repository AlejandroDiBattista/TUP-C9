const PersonaRegistrada = ({ persona }) => (
  <li className="persona">
    <div><strong>ID: </strong> {persona.id}</div>
    <div><strong>Nombre: </strong> {persona.nombre}</div>
    <div><strong>Apellido: </strong> {persona.apellido}</div>
    <div><strong>Telefono: </strong> {persona.telefono}</div>
  </li>
);

const App = () => {
  const personasRegistradas = [
    { id: 1, nombre: 'Gasto', apellido: 'Villafañe', telefono: '381123445' },
    { id: 2, nombre: 'Matias', apellido: 'Monaco', telefono: '381658365' },
    { id: 3, nombre: 'Lourdes', apellido: 'Rocha', telefono: '381641274' },
    { id: 4, nombre: 'Paula', apellido: 'Zerda', telefono: '381767146' },
    { id: 5, nombre: 'Franco', apellido: 'Saravia', telefono: '3817471212' },
    { id: 6, nombre: 'Mica', apellido: 'Sbroco', telefono: '381741824' },
    { id: 7, nombre: 'Tomas', apellido: 'Sanchez', telefono: '381721671' }
  ];

  return (
    <div>
      <h1>¡REGISTRO POWERFIT GYM!</h1>
      <h2>Personas Registradas</h2>
      <ul>
        {personasRegistradas.map(persona => (
          <PersonaRegistrada key={persona.id} persona={persona} />
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
