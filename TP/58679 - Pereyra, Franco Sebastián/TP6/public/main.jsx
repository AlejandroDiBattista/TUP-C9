function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [formType, setFormType] = useState(null); 

    const handleBack = () => {
        setFormType(null);
    };

    return (
        <div className="container">
            <div className="login-box centered">
                <h1>Netflix</h1>
                {!loggedIn && !formType && (
                    <div className="button-container">
                        <button className="app-button" onClick={() => setFormType('register')}>Registrarse</button>
                        <button className="app-button" onClick={() => setFormType('login')}>Iniciar sesión</button>
                    </div>
                )}
                {!loggedIn && formType === 'register' && (
                    <div>
                        <Register />
                        <button className="app-button back-button" onClick={handleBack}>Volver</button>
                    </div>
                )}
                {!loggedIn && formType === 'login' && (
                    <div>
                        <Login setLoggedIn={setLoggedIn} />
                        <button className="app-button back-button" onClick={handleBack}>Volver</button>
                    </div>
                )}
                {loggedIn && <Info />}
                {loggedIn && <Logout setLoggedIn={setLoggedIn} />}
            </div>
        </div>
    );
}

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!username.trim() || !password.trim()) {
            setMessage('Por favor completa todos los campos.');
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
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Registro</h2>
            <label>
                Correo electrónico:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit" className="app-button">Registrarse</button>
            <p className={`message ${message.includes('completa todos los campos') ? 'error' : 'success'}`}>{message}</p>
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
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Iniciar sesión</h2>
            <label>
                Correo electrónico:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit" className="app-button">Iniciar sesión</button>
            <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>
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
        setLoggedIn(false);
    };

    return (
        <div>
            <button className="app-button" onClick={handleLogout}>Logout</button>
            <p className="message success">{message}</p>
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
        };

        fetchInfo();
    }, []);

    return (
        <div className="info">
            <h2>Info</h2>
            <p>{info}</p>
        </div>
    );
}
