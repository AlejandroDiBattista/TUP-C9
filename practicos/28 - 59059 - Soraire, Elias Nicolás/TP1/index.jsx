const PersonaRegistrada = ({ persona }) => (
    <li className="persona">
        <div><strong>ID: </strong> {persona.id}</div>
        <div><strong>Nombre: </strong> {persona.nombre}</div>
        <div><strong>Apellido: </strong> {persona.apellido}</div>
        <div><strong>Edad: </strong>{persona.edad}</div>
        <div><strong>Entrenamiento: </strong> {persona.entrenamiento}</div>
        <div><strong>Correo: </strong> {persona.correo}</div>
    </li>
  );
  
  const App = () => {
    const personasRegistradas = [
        { id: 1, nombre: 'Gasto', apellido: 'Villafañe', edad: 22, correo: 'gasto.villafañe@gmail.com', entrenamiento: 'Fuerza' },
        { id: 2, nombre: 'Matias', apellido: 'Monaco', edad: 19, correo: 'matias.monaco@gmail.com', entrenamiento: 'Resistencia' },
        { id: 3, nombre: 'Lourdes', apellido: 'Rocha', edad: 23, correo: 'lourdes.rocha@gmail.com', entrenamiento: 'Cardiovascular' },
        { id: 4, nombre: 'Paula', apellido: 'Zerda', edad: 20, correo: 'paula.zerda@gmail.com', entrenamiento: 'Flexibilidad' },
        { id: 5, nombre: 'Franco', apellido: 'Saravia', edad: 24, correo: 'franco.saravia@gmail.com', entrenamiento: 'Alta intensidad' },
        { id: 6, nombre: 'Mica', apellido: 'Sbroco', edad: 21, correo: 'mica.sbroco@gmail.com', entrenamiento: 'Funcional' },
        { id: 7, nombre: 'Tomas', apellido: 'Sanchez', edad: 25, correo: 'tomas.sanchez@gmail.com', entrenamiento: 'Circuito' }
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
  