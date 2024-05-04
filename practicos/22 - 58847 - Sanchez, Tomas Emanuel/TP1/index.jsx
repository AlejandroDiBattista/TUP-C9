const contactos = [
  { id: 0, nombre: "Lourdes", Apellido: "Rocha", telefono: "65445" },
  { id: 1, nombre: "Luca", Apellido: "Nadotti", telefono: "65786" },
  { id: 2, nombre: "Roman", Apellido: "Riquelme", telefono: "76554" },
  { id: 3, nombre: "Carlos", Apellido: "Bianchi", telefono: "5645" },
  { id: 4, nombre: "Nahuel", Apellido: "Strakka", telefono: "764534" },
  { id: 6, nombre: "Baldu", Apellido: "Degas", telefono: "54433" },
  { id: 7, nombre: "Lourdes", Apellido: "Rocha", telefono: "65445" },
  { id: 8, nombre: "Luca", Apellido: "Nadotti", telefono: "65786" },
  { id: 9, nombre: "Roman", Apellido: "Riquelme", telefono: "76554" },
  { id: 10, nombre: "Carlos", Apellido: "Bianchi", telefono: "5645" },
  { id: 11, nombre: "Nahuel", Apellido: "Strakka", telefono: "764534" },
  { id: 12, nombre: "Baldu", Apellido: "Degas", telefono: "54433" },
  { id: 13, nombre: "Lourdes", Apellido: "Rocha", telefono: "65445" },
  { id: 14, nombre: "Luca", Apellido: "Nadotti", telefono: "65786" },
  { id: 15, nombre: "Roman", Apellido: "Riquelme", telefono: "76554" },
  { id: 16, nombre: "Carlos", Apellido: "Bianchi", telefono: "5645" },
  { id: 17, nombre: "Nahuel", Apellido: "Strakka", telefono: "764534" },
  { id: 18, nombre: "Baldu", Apellido: "Degas", telefono: "54433" },
]

const Contacto = ({ nombre, Apellido, telefono }) => (
  <div className="tarjeta">
    <h2>{nombre} {Apellido}</h2>
    <p>Telefono: {telefono}</p>
  </div>
)

const Agenda = () => (
  <div className="agenda">
    <h1>Agenda de contactos</h1>
    {contactos.map((contacto) => (
      <Contacto
        key={contacto.id}
        nombre={contacto.nombre}
        Apellido={contacto.Apellido}
        telefono={contacto.telefono}
      />
    ))}
  </div>
)

ReactDOM.render(
  <Agenda />,
  document.getElementById('root'))



