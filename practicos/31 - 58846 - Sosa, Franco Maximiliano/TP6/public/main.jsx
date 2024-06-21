
function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            {!loggedIn && (
                <div className="button-container">
                    <button onClick={() => { setShowRegister(true); setShowLogin(false); }}>Registro</button>
                    <button onClick={() => { setShowLogin(true); setShowRegister(false); }}>Login</button>
                </div>
            )}
            {!loggedIn && showRegister && <Register />}
            {!loggedIn && showLogin && <Login setLoggedIn={setLoggedIn} />}
            {loggedIn && <Info />}
            {loggedIn && (
                <div className="logout-container">
                    <Logout setLoggedIn={setLoggedIn} />
                </div>
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
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setMessage(data.message);
        console.log('Register response:', data);
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
            <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>
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
        console.log('Login response:', data);
        if (response.ok) {
            setLoggedIn(true);
        }
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
            <button type="submit">Login</button>
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
        console.log('Logout response:', data);
        setLoggedIn(false);
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
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
            console.log('Info response:', data);
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


