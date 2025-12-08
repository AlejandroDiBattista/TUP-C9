import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [vistaActual, setVistaActual] = useState('login');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const agregarUsuario = (nombreUsuario, contrasena) => {
        setUsuarios([...usuarios, { nombreUsuario, contrasena }]);
        cambiarVista('login');
    };

    const iniciarSesion = (nombreUsuario, contrasena) => {
        const usuario = usuarios.find(
            (user) => user.nombreUsuario === nombreUsuario && user.contrasena === contrasena
        );
        if (usuario) {
            setUsuarioActual(usuario);
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    const cerrarSesion = () => {
        setUsuarioActual(null);
        setVistaActual('login');
    };

    const cambiarVista = (vista) => {
        setVistaActual(vista);
        setNombreUsuario('');
        setContrasena('');
    };

    const handleRegistro = (e) => {
        e.preventDefault();
        agregarUsuario(nombreUsuario, contrasena);
    };

    const handleInicioSesion = (e) => {
        e.preventDefault();
        iniciarSesion(nombreUsuario, contrasena);
    };

    return (
        <div id="container">
            <h1>Gestión de Sesiones</h1>
            {usuarioActual ? (
                <div>
                    <p>Bienvenido, {usuarioActual.nombreUsuario}</p>
                    <button onClick={cerrarSesion}>Cerrar Sesión</button>
                    <Informacion />
                </div>
            ) : (
                vistaActual === 'login' ? (
                    <InicioSesion
                        nombreUsuario={nombreUsuario}
                        contrasena={contrasena}
                        setNombreUsuario={setNombreUsuario}
                        setContrasena={setContrasena}
                        handleInicioSesion={handleInicioSesion}
                        cambiarVista={cambiarVista}
                    />
                ) : (
                    <Registro
                        nombreUsuario={nombreUsuario}
                        contrasena={contrasena}
                        setNombreUsuario={setNombreUsuario}
                        setContrasena={setContrasena}
                        handleRegistro={handleRegistro}
                        cambiarVista={cambiarVista}
                    />
                )
            )}
        </div>
    );
};

const Registro = ({ nombreUsuario, contrasena, setNombreUsuario, setContrasena, handleRegistro, cambiarVista }) => (
    <form onSubmit={handleRegistro}>
        <h2>Registrar</h2>
        <label>
            Usuario:
            <input
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
            />
        </label>
        <label>
            Contraseña:
            <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
            />
        </label>
        <button type="submit">Registrar</button>
        <button type="button" onClick={() => cambiarVista('login')}>Ya tengo una cuenta</button>
    </form>
);

const InicioSesion = ({ nombreUsuario, contrasena, setNombreUsuario, setContrasena, handleInicioSesion, cambiarVista }) => (
    <form onSubmit={handleInicioSesion}>
        <h2>Iniciar Sesión</h2>
        <label>
            Usuario:
            <input
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
            />
        </label>
        <label>
            Contraseña:
            <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
            />
        </label>
        <button type="submit">Iniciar Sesión</button>
        <button type="button" onClick={() => cambiarVista('registro')}>No tengo una cuenta</button>
    </form>
);

const Informacion = () => (
    <section>
        <h2>Información Protegida</h2>
        <p>Esta es una página que solo puedes ver si estás logueado.</p>
    </section>
);

export default App;
