function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [info, setInfo] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        setMessage(data.message);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        setMessage(data.message);
        if (response.ok) {
            setLoggedIn(true);
        }
    };

    const handleLogout = async () => {
        const response = await fetch('/logout', { method: 'POST' });
        const data = await response.json();
        setMessage(data.message);
        setLoggedIn(false);
        setInfo('');
    };

    const fetchInfo = async () => {
        const response = await fetch('/info');
        const data = await response.json();
        if (response.ok) {
            setInfo(data.message);
        } else {
            setMessage(data.message);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            fetchInfo();
        }
    }, [loggedIn]);

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            <form onSubmit={handleRegister}>
                <h2>Registrar</h2>
                <label>
                    Usuario:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Registrar</button>
            </form>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <label>
                    Usuario:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            {loggedIn && (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <div>
                        <h2>Info</h2>
                        <p>{info}</p>
                    </div>
                </div>
            )}
            <div>{message}</div>
        </div>
    );
}
