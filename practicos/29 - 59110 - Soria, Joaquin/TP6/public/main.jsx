function App() {
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [info, setInfo] = React.useState('');
    const [message, setMessage] = React.useState(''); // Estado para mensajes

    const handleRegister = async () => {
        try {
            const response = await axios.post('/registrar', { user, password });
            setMessage(response.data); // Establece el mensaje de éxito
        } catch (error) {
            setMessage('Error al registrar'); // Establece el mensaje de error
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', { user, password });
            setIsLoggedIn(true);
            setMessage('Iniciaste sesion correctamente'); // Establece el mensaje de bienvenida
        } catch (error) {
            setIsLoggedIn(false);
            setMessage('Usuario o contraseña incorrectos'); // Establece el mensaje de error
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            setIsLoggedIn(false);
            setInfo('');
            setMessage('Sesión cerrada'); // Establece el mensaje de sesión cerrada
        } catch (error) {
            setMessage('Error al cerrar sesión'); // Establece el mensaje de error
        }
    };

    const handleInfo = async () => {
        try {
            const response = await axios.get('/info');
            setInfo(response.data);
            setMessage(''); // Limpia el mensaje anterior
        } catch (error) {
            setMessage('Operación no autorizada. Por favor, inicie sesión.'); // Establece el mensaje de error
        }
    };

    return (
        <div id="root">
            <h1>Gestión de Sesión</h1>
            {!isLoggedIn ? (
                <section>
                    <h2>Registrar</h2>
                    <form>
                        <label>
                            Usuario:
                            <input type="text" value={user} onChange={e => setUser(e.target.value)} />
                        </label>
                        <label>
                            Contraseña:
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                        <span>
                            <button type="button" onClick={handleRegister}>Registrar</button>
                            <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
                        </span>
                        {message && <p>{message}</p>} {/* Renderiza el mensaje aquí */}
                    </form>
                </section>
            ) : (
                <section>
                    <h2>Bienvenido, {user}</h2>
                    <div>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                    <div>
                        <button onClick={handleInfo}>Mostrar Información</button>
                        {message && <p>{message}</p>} {/* Renderiza el mensaje aquí */}
                        {info && <p>{info}</p>}
                    </div>
                </section>
            )}
        </div>
    );
}
