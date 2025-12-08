

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [view, setView] = useState(null);

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const handleLogout = async () => {
        const response = await fetch('/logout', {
            method: 'POST',
        });

        const data = await response.json();
        console.log('Logout response:', data);
        setLoggedIn(false);
        setView(null);
    };

    return (
        <div>
            <h1>X</h1>
            {!loggedIn && !view && (
                <div className="button-container">
                    <button onClick={() => handleViewChange('register')}>Registro</button>
                    <button onClick={() => handleViewChange('login')}>Login</button>
                </div>
            )}
            {view === 'register' && <Register setView={setView} />}
            {view === 'login' && <Login setLoggedIn={setLoggedIn} handleLogout={handleLogout} />}
            {loggedIn && <Info />}
            {loggedIn && <Logout handleLogout={handleLogout} />}
        </div>
    );
}


function Register({ setView }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!username || !password) {
            setMessage('Por favor, complete todos los campos.');
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
        console.log('Register response:', data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-header">
                <h2>Registro</h2>
                <button type="button" onClick={() => setView(null)}>Volver</button>
            </div>
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

function Login({ setLoggedIn, handleLogout }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!username || !password) {
            setMessage('Por favor, complete todos los campos.');
            return;
        }

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

function Logout({ handleLogout }) {
    return (
        <div>
            <button className="logout" onClick={handleLogout}>Logout</button>
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


