function App() {
    // Estados para el formulario de registro
    const [registroUsuario, setRegistroUsuario] = useState('');
    const [registroContrasena, setRegistroContrasena] = useState('');

    // Estados para el formulario de login
     const [loginContrasena, setLoginContrasena] = useState('');

    // Estados generales
    const [mensaje, setMensaje] = useState('');
    const [logueado, setLogueado] = useState(false);
    const [informacion, setInformacion] = useState('');

    const manejarRegistro = async (e) => {
        e.preventDefault();
        const respuesta = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: registroUsuario, password: registroContrasena })
        });
        const datos = await respuesta.json();
        setMensaje(datos.message);
    };

    const manejarLogin = async (e) => {
        e.preventDefault();
        const respuesta = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: loginUsuario, password: loginContrasena })
        });
        const datos = await respuesta.json();
        setMensaje(datos.message);
        if (respuesta.ok) {
            setLogueado(true);
        }
    };

    const manejarLogout = async () => {
        const respuesta = await fetch('/logout', {
            method: 'POST',
        });
        const datos = await respuesta.json();
        setMensaje(datos.message);
        setLogueado(false);
        setInformacion('');
    };

    const manejarInfo = async () => {
        const respuesta = await fetch('/info');
        const datos = await respuesta.json();
        if (respuesta.ok) {
            setInformacion(datos.message);
        } else {
            setMensaje(datos.message);
        }
    };

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            <form onSubmit={manejarRegistro}>
                <h3>Registrar</h3>
                <label>
                    Usuario:
                    <input type="text" value={registroUsuario} onChange={(e) => setRegistroUsuario(e.target.value)} required />
                </label>
                <label>
                    Contraseña:
                    <input type="password" value={registroContrasena} onChange={(e) => setRegistroContrasena(e.target.value)} required />
                </label>
                <button type="submit">Registrar</button>
            </form>
            <form onSubmit={manejarLogin}>
                <h3>Login</h3>
                <label>
                    Usuario:
                    <input type="text" value={loginUsuario} onChange={(e) => setLoginUsuario(e.target.value)} required />
                </label>
                <label>
                    Contraseña:
                    <input type="password" value={loginContrasena} onChange={(e) => setLoginContrasena(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
            </form>
            {logueado && (
                <div>
                    <button onClick={manejarLogout}>Logout</button>
                    <button onClick={manejarInfo}>Ver Información</button>
                    {informacion && <p>{informacion}</p>}
                </div>
            )}
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
