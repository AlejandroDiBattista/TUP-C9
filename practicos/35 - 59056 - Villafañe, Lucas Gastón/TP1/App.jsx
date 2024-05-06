import { useState } from 'react';
import './index.css';

function App() {
    const [contactos, setContactos] = useState([]);
    const [nuevoContacto, setNuevoContacto] = useState({ id: '', nombre: '', apellido: '', númeroTeléfono: '' });

    const manejarCambioInput = (evento) => {
        const { name, value } = evento.target;
        setNuevoContacto({ ...nuevoContacto, [name]: value });
    };

    const manejarAgregarContacto = () => {
        if (!nuevoContacto.id || !nuevoContacto.nombre || !nuevoContacto.apellido || !nuevoContacto.númeroTeléfono) {
            alert('completa todos los campos');
            return;
        }
        if (contactos.find(contacto => contacto.id === nuevoContacto.id)) {
            alert('El ID ya existe');
            return;
        }
        setContactos([...contactos, nuevoContacto]);
        setNuevoContacto({ id: '', nombre: '', apellido: '', númeroTeléfono: '' });
    };

    const manejarEliminarContacto = (id) => {
        setContactos(contactos.filter(contacto => contacto.id !== id));
    };

    return (
        <div className="container mt-4">
            <div className="form-card">
                <h2>Agregar Contacto</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>ID:</label>
                            <input type="text" className="form-control" name="id" value={nuevoContacto.id} onChange={manejarCambioInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" className="form-control" name="nombre" value={nuevoContacto.nombre} onChange={manejarCambioInput} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Apellido:</label>
                            <input type="text" className="form-control" name="apellido" value={nuevoContacto.apellido} onChange={manejarCambioInput} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Número de Teléfono:</label>
                            <input type="text" className="form-control" name="númeroTeléfono" value={nuevoContacto.númeroTeléfono} onChange={manejarCambioInput} />
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={manejarAgregarContacto}>Agregar Contacto</button>
            </div>

            <div className="contact-list mt-4">
                {contactos.map(contacto => (
                    <div key={contacto.id} className="contact-card card">
                        <div className="card-body">
                            <p>ID: {contacto.id}</p>
                            <h4>{contacto.nombre} {contacto.apellido}</h4>
                            <p>Teléfono: {contacto.númeroTeléfono}</p>
                            <button className="btn btn-danger delete-button" onClick={() => manejarEliminarContacto(contacto.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default App;