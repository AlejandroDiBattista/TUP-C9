function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(true);  // Nuevo estado para alternar entre formularios

    const toggleForm = () => {
        setShowRegister(!showRegister);
    };
    // Verificar 
    return (
        <div>
            <h1>TP6 Tomas Ruiz</h1>
            {!loggedIn && (
                <div className="form-container">
                    {showRegister ? (
                        <div className="form-wrapper">
                            <Register />
                            <button onClick={toggleForm}>Ya tienes cuenta?</button>  {/* Botón para alternar */}
                        </div>
                    ) : (
                        <div className="form-wrapper">
                            <Login setLoggedIn={setLoggedIn} />
                            <button onClick={toggleForm}>Todavia no tienes cuenta?</button>  {/* Botón para alternar */}
                        </div>
                    )}
                </div>
            )}
            {loggedIn && (
                <>
                    <Logout setLoggedIn={setLoggedIn} />
                    <Info />
                </>
            )}
        </div>
    );
}

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setMessage('Usuario y contraseña no pueden estar vacíos');
            return;
        }

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setMessage(data.message);
        if (response.ok) {
            setUsername('');
            setPassword('');
        }
        console.log('Respuesta de registro:', data);  
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <label>
                Usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Registrar</button>
            {message && <p className={`message ${message.includes('exitosamente') ? 'success' : 'error'}`}>{message}</p>}
        </form>
    );
}

function Login({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setMessage(data.message);
        if (response.ok) {
            setLoggedIn(true);
            setUsername('');
            setPassword('');
        } else {
            setUsername('');
            setPassword('');
        }
        console.log('Respuesta de login:', data);  
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                Usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Loguearse</button>
            {message && <p className={`message ${message.includes('exitoso') ? 'success' : 'error'}`}>{message}</p>}
        </form>
    );
}

function Logout({ setLoggedIn }) {
    const [message, setMessage] = useState('');

    const handleLogout = async () => {
        const response = await fetch('/logout', {
            method: 'POST',
        });

        const data = await response.json();
        setMessage(data.message);
        console.log('Respuesta de logout:', data);
        setLoggedIn(false);
    };

    return (
        <div className="logout">
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

function Info() {
    const [info, setInfo] = useState('');

    useEffect(() => {
        const fetchInfo = async () => {
            const response = await fetch('/info');
            const data = await response.json();
            setInfo(data.message);
            console.log('Respuesta de info:', data);  
        };

        fetchInfo();
    }, []);

    return (
        <div className="info">
            <h2>Bienvenido a la Pagina de nuestros usuarios!</h2>
            <p>{info}</p>
            <img src="messi.jpg" alt="Info" className="info-image" />
        </div>
    );
}
