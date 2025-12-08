function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/session')
            .then(res => res.json())
            .then(data => setUser(data.user));
    }, []);

    const handleRegister = (event) => {
        event.preventDefault();
        const { username, password } = event.target.elements;
        fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setUser(data.user);
            } else {
                alert(data.message);
            }
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const { username, password } = event.target.elements;
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setUser(data.user);
            } else {
                alert(data.message);
            }
        });
    };

    const handleLogout = () => {
        fetch('/api/logout', {
            method: 'POST'
        }).then(() => setUser(null));
    };

    return (
        <div>
            <h1>Gestion de Sesiones</h1>
            {!user ? (
                <div>
                    <h2>Registrar</h2>
                    <form onSubmit={handleRegister}>
                        <input type="text" name="username" placeholder="Username" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <button type="submit">Registrar</button>
                    </form>

                    <h2>Iniciar Sesion</h2>
                    <form onSubmit={handleLogin}>
                        <input type="text" name="username" placeholder="Username" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <button type="submit">Iniciar Sesion</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>vienvenido, {user}</h2>
                    <button onClick={handleLogout}>Cerrar Sesion</button>
                    <ProtectedInfo />
                </div>
            )}
        </div>
    );
}

function ProtectedInfo() {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        fetch('/api/info')
            .then(res => res.json())
            .then(data => setInfo(data.info))
            .catch(() => setInfo(null));
    }, []);

    return (
        <div>
            <h2>Informacion Protegida</h2>
            {info ? <p>{info}</p> : <p>estos datos estan protegidos para el que inicia sesion</p>}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
