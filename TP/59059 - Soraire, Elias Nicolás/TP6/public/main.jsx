const { useState } = React;

const Aplicacion = () => {
    const [usuario, setUsuario] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [registrando, setRegistrando] = useState(false);

    const manejarRegistro = async () => {
        if (!nombreUsuario || !contrasena) {
            setMensaje('Por favor, completa todos los campos');
            setTipoMensaje('error');
            return;
        }

        const respuesta = await fetch('/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombreUsuario, contrasena })
        });
        const datos = await respuesta.json();
        setMensaje(datos.mensaje);
        setTipoMensaje(respuesta.ok ? 'exito' : 'error');
        if (respuesta.ok) {
            setRegistrando(false);
            setNombreUsuario('');
            setContrasena('');
        }
    };

    const manejarInicioSesion = async () => {
        if (!nombreUsuario || !contrasena) {
            setMensaje('Por favor, completa todos los campos');
            setTipoMensaje('error');
            return;
        }

        const respuesta = await fetch('/api/inicio-sesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombreUsuario, contrasena })
        });
        const datos = await respuesta.json();
        if (respuesta.ok) {
            setUsuario(datos.usuario);
            setMensaje('Has iniciado sesión exitosamente');
            setTipoMensaje('exito');
        } else {
            setMensaje(datos.mensaje);
            setTipoMensaje('error');
        }
    };

    const manejarCierreSesion = async () => {
        const respuesta = await fetch('/api/cierre-sesion', { method: 'POST' });
        const datos = await respuesta.json();
        setUsuario(null);
        setMensaje(datos.mensaje);
        setTipoMensaje('exito');
    };

    const cambiarModo = () => {
        setRegistrando(!registrando);
        setNombreUsuario('');
        setContrasena('');
        setMensaje('');
    };

    return (
        <div className="contenedor">
            <h1>Gestión de Usuarios</h1>
            {mensaje && <p className={tipoMensaje}>{mensaje}</p>}
            {!usuario ? (
                <div className="formulario-contenedor">
                    {registrando ? (
                        <>
                            <h2>Registro de Usuario</h2>
                            <input
                                type="text"
                                placeholder="Nombre de Usuario"
                                value={nombreUsuario}
                                onChange={e => setNombreUsuario(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={e => setContrasena(e.target.value)}
                            />
                            <button onClick={manejarRegistro}>Registrarse</button>
                            <p>¿Ya tienes cuenta? <a href="#" onClick={cambiarModo}>Iniciar Sesión</a></p>
                        </>
                    ) : (
                        <>
                            <h2>Inicio de Sesión</h2>
                            <input
                                type="text"
                                placeholder="Nombre de Usuario"
                                value={nombreUsuario}
                                onChange={e => setNombreUsuario(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={e => setContrasena(e.target.value)}
                            />
                            <button onClick={manejarInicioSesion}>Iniciar Sesión</button>
                            <p>¿No tienes cuenta? <a href="#" onClick={cambiarModo}>Registrarse</a></p>
                        </>
                    )}
                </div>
            ) : (
                <div className="info-contenedor">
                    <h2>¡Bienvenido, {usuario.nombreUsuario}!</h2>
                    <button onClick={manejarCierreSesion}>Cerrar Sesión</button>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<Aplicacion />, document.getElementById('root'));