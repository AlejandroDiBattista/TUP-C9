function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [view, setView] = useState('');

    return (
        <div>
            <br />
            {!loggedIn && (
                <div className="tabs">
                    <button onClick={() => setView('login')} className={view === 'login' ? 'active' : ''}>Iniciar Sesión</button>
                    <button onClick={() => setView('register')} className={view === 'register' ? 'active' : ''}>Registrar</button>
                </div>
            )}
            {view === 'register' && !loggedIn && (
                <div className="container">
                    <Registro />
                </div>
            )}
            {view === 'login' && !loggedIn && (
                <div className="container">
                    <InicioSesion setLoggedIn={setLoggedIn} />
                </div>
            )}
            {loggedIn && (
                <div className="container">
                    <Informacion />
                    <CerrarSesion setLoggedIn={setLoggedIn} />
                </div>
            )}
        </div>
    );
}

function Registro() {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        const respuesta = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: usuario, password: contraseña }),
        });

        const datos = await respuesta.json();
        setMensaje(datos.message);
    };

    return (
        <form onSubmit={manejarEnvio}>
            <h2>Registro</h2>
            <label>
                Usuario:
                <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
            </label>
            <button type="submit">Registrar</button>
            <p className={`mensaje ${mensaje.includes('successfully') ? 'success' : 'error'}`}>{mensaje}</p>
        </form>
    );
}

function InicioSesion({ setLoggedIn }) {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        const respuesta = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: usuario, password: contraseña }),
        });

        const datos = await respuesta.json();
        setMensaje(datos.message);
        if (respuesta.ok) {
            setLoggedIn(true);
        }
    };

    return (
        <form onSubmit={manejarEnvio}>
            <h2>Inicio de Sesión</h2>
            <label>
                Usuario:
                <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
            </label>
            <button type="submit">Iniciar Sesión</button>
            <p className={`mensaje ${mensaje.includes('successful') ? 'success' : 'error'}`}>{mensaje}</p>
        </form>
    );
}

function CerrarSesion({ setLoggedIn }) {
    const [mensaje, setMensaje] = useState('');

    const manejarCerrarSesion = async () => {
        const respuesta = await fetch('/logout', {
            method: 'POST',
        });

        const datos = await respuesta.json();
        setMensaje(datos.message);
        setLoggedIn(false);
    };

    return (
        <div>
            <button onClick={manejarCerrarSesion}>Cerrar Sesión</button>
            <p className="mensaje success">{mensaje}</p>
        </div>
    );
}

function Informacion() {
    const [info, setInfo] = useState('');

    useEffect(() => {
        const obtenerInfo = async () => {
            const respuesta = await fetch('/info');
            const datos = await respuesta.json();
            setInfo(datos.message);
        };

        obtenerInfo();
    }, []);

    return (
        <div className="info">
            <h2>Sesión exclusiva para usuarios</h2>
            <p>{info}</p>
        </div>
    );
}
