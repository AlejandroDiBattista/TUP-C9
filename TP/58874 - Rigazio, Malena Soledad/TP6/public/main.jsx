import React, { useState, useEffect } from 'react';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleAuthentication = (status) => {
        setIsAuthenticated(status);
        if (status) {
            setShowLoginForm(false);
        }
    };

    return (
        <div className='container'>
            <h1>TP6 - Sesiones</h1>
            <div>
                <button onClick={() => { setShowRegisterForm(true); setShowLoginForm(false); }}>
                    Registrar
                </button>
                <button onClick={() => { setShowLoginForm(true); setShowRegisterForm(false); }}>
                    Iniciar
                </button>
            </div>
            {showRegisterForm && <Register />}
            {showLoginForm && <Login setIsAuthenticated={handleAuthentication} />}
            {isAuthenticated && <Info />}
            {isAuthenticated && <Logout setIsAuthenticated={setIsAuthenticated} />}
        </div>
    );
}

function Registro() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setMessage(data.message);
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
            <button type="submit">Registrar
            </button>
            <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>
        </form>
    );
}

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setMessage(data.message);
        if (response.ok) {
            setIsAuthenticated(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>
        </form>
    );
}

function Logout({ setIsAuthenticated }) {
    const [message, setMessage] = useState('');

    const handleLogout = async () => {
        const response = await fetch('/logout', { method: 'POST' });
        const data = await response.json();
        setMessage(data.message);
        setIsAuthenticated(false);
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
        };

        fetchInfo();
    }, []);

    return (
        <div className="info">
            <h2>Informaciòn</h2>
            <p>{info}</p>
        </div>
    );
}

export default App;
