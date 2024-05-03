const ListaContactos = ({ contactos }) => {
  const [imagenes, setImagenes] = React.useState([]);

  React.useEffect(() => {
    const obtenerImagenes = async () => {
      const nuevasImagenes = [];
      for (let i = 0; i < contactos.length; i++) {
        const genero = i % 2 === 0 ? 'male' : 'female';
        const respuesta = await fetch(`https://randomuser.me/api/?gender=${genero}`);
        const data = await respuesta.json();
        nuevasImagenes.push(data.results[0].picture.large);
      }
      setImagenes(nuevasImagenes);
    };
    obtenerImagenes();
  }, [contactos]);

  return (
    <div>
      <h1>Agenda de contactos</h1>
      <ul>
        {contactos.map((contacto, index) => (
          <li key={index}>
            <div>
              <div id="identidad-contacto">
                <span >{contacto.nombre} {contacto.apellido} </span>
                <img src={imagenes[index]} alt="Foto de perfil"/>
              </div>
              <b>Email</b>: {contacto.email} <br />
            </div>
            <div id="telefono">
              <b>Teléfono</b>: {contacto.telefono} <br />
              <b>ID</b>: {index}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
