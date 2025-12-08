function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(true);

    const toggleForm = () => {
        setShowRegister(!showRegister);
    }
    // Verficar
    return (
		<div>
			<h1>TP6 - Sesiones</h1>
			{!loggedIn && (
				<div className="form-container">
					{showRegister ? (
                        <div className='form-wrapper'>
                            <Register />
                            <button onClick={toggleForm}>Ya tienes una cuenta? Iniciar Sesión </button>
                        </div>
                    ) : (
                        <div className='form-wrapper'>
                            <Login setLoggedIn={setLoggedIn} />
                            <button onClick={toggleForm}>No tienes una cuenta? Crear Ahora</button>
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

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setMessage('Campos obligatorios');
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
        console.log('Res de registro: ', data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrarse</h2>
            <label htmlFor="username">Usuario</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">ENVIAR</button>
            {message && <p className={`message ${message.includes('exitosamente') ? 'success' : 'error'}`}>{message}</p>}
        </form>
    )
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
        }
        console.log('Res de login: ', data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <label htmlFor="username">Usuario</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">ENVIAR</button>
            {message && <p className={`message ${message.includes('exitosamente') ? 'success' : 'error'}`}>{message}</p>}
        </form>
    )
}

function Logout({ setLoggedIn }) {
    const [message, setMessage] = useState('');

    const handleLogout = async () => {
        const response = await fetch('/logout', {
            method: 'POST',
        });
        const data = await response.json();
        setMessage(data.message);
        console.log('Res de logout: ', data);
        setLoggedIn(false);
    };

    return (
        <div className="logout">
            <button onClick={handleLogout}>Salir de la cuenta</button>
        </div>
    )
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
            <h3>Inicio</h3>
            <p>{info}</p>
        </div>
    )
}
