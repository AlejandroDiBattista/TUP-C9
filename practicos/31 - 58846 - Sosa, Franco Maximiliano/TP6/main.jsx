function App() {
    const [inicioSesion, setInicioSesion] = useState(false);
    const [vista, setVista] = useState('');  
    const [credenciales, setCredenciales] = useState({ usuario: '', contraseña: '' });
    const [mensaje, setMensaje] = useState('');
    const [info, setInfo] = useState('');

    const manejarCambio = (e) => setCredenciales({ ...credenciales, [e.target.name]: e.target.value });

    const manejarEnvioRegistro = async (event) => {
        event.preventDefault();
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: credenciales.usuario, password: credenciales.contraseña }),
        });

        const data = await response.json();
        setMensaje(data.message);
    };

    const manejarEnvioLogin = async (event) => {
        event.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: credenciales.usuario, password: credenciales.contraseña }),
        });

        if (response.ok) {
            setInicioSesion(true);
            setVista('');
            setMensaje(''); 
        } else {
            const data = await response.json();
            setMensaje(data.message);
        }
    };

    const manejarCerrarSesion = async () => {
        const response = await fetch('/logout', { method: 'POST' });
        const data = await response.json();
        setMensaje(data.message);
        setInicioSesion(false);
        setVista('');
    };

    useEffect(() => {
        const obtenerInfo = async () => {
            const response = await fetch('/info');
            const data = await response.json();
            setInfo(data.message);
        };

        if (inicioSesion) {
            obtenerInfo();
        }
    }, [inicioSesion]);

    useEffect(() => {
        setMensaje('');
    }, [vista]);

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            {!inicioSesion && (
                <div className="contenedor-botones">
                    <button onClick={() => setVista('registro')}>Registro</button>
                    <button onClick={() => setVista('inicioSesion')}>Login</button>
                </div>
            )}
            {vista === 'registro' && (
                <form onSubmit={manejarEnvioRegistro}>
                    <h2>Registro</h2>
                    <label>
                        Usuario:
                        <input type="text" name="usuario" value={credenciales.usuario} onChange={manejarCambio} />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="contraseña" value={credenciales.contraseña} onChange={manejarCambio} />
                    </label>
                    <button type="submit">Registrar</button>
                    <p className={mensaje.includes('exito') ? 'exito' : 'error'}>{mensaje}</p>
                </form>
            )}
            {vista === 'inicioSesion' && !inicioSesion && (
                <form onSubmit={manejarEnvioLogin}>
                    <h2>Login</h2>
                    <label>
                        Usuario:
                        <input type="text" name="usuario" value={credenciales.usuario} onChange={manejarCambio} />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="contraseña" value={credenciales.contraseña} onChange={manejarCambio} />
                    </label>
                    <button type="submit">Login</button>
                    <p className={mensaje.includes('correctamente') ? 'exito' : 'error'}>{mensaje}</p>
                </form>
            )}
            {inicioSesion && (
                <div className="informacion">
                    <h2>Informacion para usuarios</h2>
                    <p>{info}</p>
                    <div className="contenedor-cerrar-sesion">
                        <button onClick={manejarCerrarSesion}>Cerrar sesión</button>
                    </div>
                </div>
            )}
        </div>
    );
}
