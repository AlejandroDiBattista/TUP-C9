function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div>
            <h1>Sesiones tp6</h1>
            <Registro />
            <Login setLoggedIn={setLoggedIn} />
            {loggedIn && <Info />}
            <Logout setLoggedIn={setLoggedIn} />
        </div>
    );
}

function Registro() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const ManejarEnvio = async (event) => {
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
        console.log('Registro response:', data);  
    };

    return (
        <form onSubmit={ManejarEnvio}>
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
            <p className={`message ${message.includes('exitosamente') ? 'éxito' : 'error'}`}>{message}</p>
        </form>
    );
}

function Login({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const ManejarEnvio = async (event) => {
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
        <form onSubmit={ManejarEnvio}>
            <h2>Inicio</h2>
            <label>
                Usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Iniciar</button>
            <p className={`message ${message.includes('Exitosamente') ? 'Exito' : 'error'}`}>{message}</p>
        </form>
    );
}

function Logout({ setLoggedIn }) {
    const [message, setMessage] = useState('');

    const ManejarCierreSesion = async () => {
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
            <button onClick={ManejarCierreSesion}>Logout</button>
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
