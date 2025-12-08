const { useState, useEffect } = React;

function App() {
    const [formRegister, setFormRegister] = useState({ username: '', password: '' });
    const [formLogin, setFormLogin] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [info, setInfo] = useState({});
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleChangeRegister = (e) => {
        const { name, value } = e.target;
        setFormRegister(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setFormLogin(prevForm => ({ ...prevForm, [name]: value }));
    };

    const register = async (e) => {
        e.preventDefault();
        const response = await fetch('/registrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: formRegister.username, password: formRegister.password })
        });
        const result = await response.text();
        setMessage(result);
        if (response.ok) {
            setFormRegister({ username: '', password: '' });
            setShowRegisterForm(false);
        }
    };

    const login = async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: formLogin.username, password: formLogin.password })
        });
        const result = await response.text();
        if (response.ok) {
            setIsLoggedIn(true);
            fetchInfo();
            setFormLogin({ username: '', password: '' });
            setShowLoginForm(false);
        }
        setMessage(result);
    };

    const logout = async () => {
        const response = await fetch('/logout', { method: 'PUT' });
        const result = await response.text();
        if (response.ok) {
            setIsLoggedIn(false);
            setInfo({});
        }
        setMessage(result);
    };

    const fetchInfo = async () => {
        const response = await fetch('/info');
        const data = await response.json();
        if (response.ok) {
            setInfo(data);
        } else {
            setMessage(data);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchInfo();
        }
    }, [isLoggedIn]);

    const showRegister = () => {
        setShowRegisterForm(true);
        setShowLoginForm(false);
    };

    const showLogin = () => {
        setShowLoginForm(true);
        setShowRegisterForm(false);
    };

    return (
        <div className="container">
            <h1>TP6 - Sesiones</h1>
            {!isLoggedIn ? (
                <div>
                    <div className="botonesinicio">
                        <button onClick={showRegister}>Registrar</button>
                        <button onClick={showLogin}>Iniciar Sesión</button>
                    </div>
                    
                    {showRegisterForm && (
                        <form onSubmit={register}>
                            <h2>Registrar Usuario</h2>
                            <label>
                                Usuario:
                                <input type="text" name="username" value={formRegister.username} onChange={handleChangeRegister} required />
                            </label>
                            <br />
                            <label>
                                Contraseña:
                                <input type="password" name="password" value={formRegister.password} onChange={handleChangeRegister} required />
                            </label>
                            <br />
                            <button type="submit">Registrar</button>
                        </form>
                    )}

                    {showLoginForm && (
                        <form onSubmit={login}>
                            <h2>Iniciar Sesión</h2>
                            <label>
                                Usuario:
                                <input type="text" name="username" value={formLogin.username} onChange={handleChangeLogin} required />
                            </label>
                            <br />
                            <label>
                                Contraseña:
                                <input type="password" name="password" value={formLogin.password} onChange={handleChangeLogin} required />
                            </label>
                            <br />
                            <button type="submit">Iniciar Sesión</button>
                        </form>
                    )}
                </div>
            ) : (
                <div>
                    <button className="logout-btn" onClick={logout}>Cerrar Sesión</button>
                    <div>
                        <h2>Información del Usuario</h2>
                        <p>Usuario: {info.user}</p>
                        <p>Contraseña: {info.password}</p>
                    </div>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
