const Contacto = ({ nombre, apellido, telefono }) => (
  <div class="contacto">
    <h2>
      {nombre} {apellido}
    </h2>
    <p>Teléfono: {telefono}</p>
  </div>
);

const contactos = [
  { id: 1, nombre: "Mauricio", apellido: "Fer Licc", telefono: "123456789" },
  { id: 2, nombre: "Lali", apellido: "Espósito", telefono: "123456789" },
  { id: 3, nombre: "Taylor", apellido: "Swift", telefono: "123456789" },
  { id: 4, nombre: "Lionel", apellido: "Messi", telefono: "123456789" },
  { id: 5, nombre: "Alejandro", apellido: "Basttista", telefono: "123456789" },
  { id: 6, nombre: "Mauro", apellido: "Cuello", telefono: "123456789" },
  { id: 7, nombre: "Lourdes", apellido: "Rocha", telefono: "123456789" },
  { id: 8, nombre: "Nahuel", apellido: "Paz", telefono: "123456789" },
  { id: 9, nombre: "Franco", apellido: "Sosa", telefono: "123456789" },
  { id: 10, nombre: "Enzo", apellido: "Perez", telefono: "123456789" },
  { id: 11, nombre: "Federico", apellido: "Vigevani", telefono: "123456789" },
  { id: 12, nombre: "Juliana", apellido: "Scaglione", telefono: "123456789" },
  { id: 13, nombre: "Silvia", apellido: "Licciardi", telefono: "123456789" },
  { id: 14, nombre: "Karen", apellido: "Fernández", telefono: "123456789" },
  { id: 15, nombre: "Nona", apellido: "Mary", telefono: "123456789" },
  { id: 16, nombre: "Nono", apellido: "Lito", telefono: "123456789" },
  { id: 17, nombre: "Gladys", apellido: "Licciardi", telefono: "123456789" },
  { id: 18, nombre: "Javier", apellido: "Andrade", telefono: "123456789" },
  { id: 19, nombre: "Candela", apellido: "Veterano", telefono: "123456789" },
  { id: 20, nombre: "Javier", apellido: "Milei", telefono: "123456789" }

];

const Agenda = () => (
  <div class="main">
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