const App = () => {
  const contactos = [
    { nombre: 'Gustavo', apellido: 'Cerati', telefono: '1928-3746', email: 'gustavocerati@gmail.com', direccion: 'Avenida Siempre Viva 314, Buenos Aires' },
    { nombre: 'Valentina', apellido: 'Caldez', telefono: '3814584274', email: 'valentinacaldez@gmail.com', direccion: 'Avenida Libertador 456, Buenos Aires' },
    { nombre: 'Joaquin', apellido: 'Soria', telefono: '3875631514', email: 'joaquinsoria@gmail.com', direccion: 'Ruta 40 KM 789, Tucumán' },
    { nombre: 'Mercedes', apellido: 'Sosa', telefono: '7777-8888', email: 'mercedessosa@gmail.com', direccion: 'Pasaje Folklore 101, Tucumán' },
    { nombre: 'Fernando', apellido: 'Quinteros', telefono: '3817693567', email: 'fernandoquinteros@gmail.com', direccion: 'Calle Los Andes 234, Mendoza' },
    { nombre: 'Noelia', apellido: 'Pompa', telefono: '8765-4321', email: 'noeliapompa@gmail.com', direccion: 'Avenida Laco 567, Buenos Aires' },
    { nombre: 'Fito', apellido: 'Paez', telefono: '1234-5678', email: 'fitopaez@gmail.com', direccion: 'Boulevard Rosario 321, Rosario' },
    { nombre: 'Patricia', apellido: 'Sosa', telefono: '2468-1357', email: 'patriciasosa@gmail.com', direccion: 'Calle Melodía 432, La Plata' },
    { nombre: 'Ramón', apellido: 'Yepura', telefono: '3815763886', email: 'ramonyepura@gmail.com', direccion: 'Calle Caminito 123, Buenos Aires' },
    { nombre: 'Tini', apellido: 'Stoessel', telefono: '1357-2468', email: 'tinitinitini@gmail.com', direccion: 'Calle Muah 890, Buenos Aires' }
  ];


  const datos = { nombre: 'Andrés', apellido: 'Ruiu', telefono: '3865351958', legajo: '58879', email: 'andresruiu@gmail.com' }

  return (
    <div>
      <TarjetaPresentacion datos={datos} />
      <ListaContactos contactos={contactos} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'))