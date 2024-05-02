const App = () => {
    const reservaciones = [
      { id: 1, nombre: 'franca', dni: '4245678', fecha: '2024-05-01', hora: '10:30', cantidadPersonas: 2 },
      { id: 2, nombre: 'micaela', dni:'4554321', fecha: '2024-05-01', hora: '11:00', cantidadPersonas: 3 },
      { id: 3, nombre: 'sir SORAIRE', dni: '45678912', fecha: '2024-05-03', hora: '12:00', cantidadPersonas: 2 },
      { id: 4, nombre: 'gastón', dni: '45122356', fecha: '2004-06-16', hora: '13:13', cantidadPersonas: 1},
      { id: 4, nombre: 'Señor Bestia', dni: '47122356', fecha: '2004-06-26', hora: '13:45', cantidadPersonas: 7},
    ];
  
    return (
      <div>
        <h1>Café Hola Mundo</h1>
        <p></p>
        <h2>Reservaciones:</h2>
        <ul>
          {reservaciones.map(reserva => (
            <li key={reserva.id}>
              <p>Nombre: {reserva.nombre}</p>
              <p>DNI: {reserva.dni}</p>
              <p>Fecha: {reserva.fecha}</p>
              <p>Hora: {reserva.hora}</p>
              <p>Cantidad de personas: {reserva.cantidadPersonas}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById('root'));