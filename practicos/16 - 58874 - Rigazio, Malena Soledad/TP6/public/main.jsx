const { useState } = React;

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');
    const [infoVisible, setInfoVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        if (!username || !password) {
            setErrorMessage('Completar todos los campos.');
            return;
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                setErrorMessage('');
                setUsername('');
                setPassword('');
               setErrorMessage('Usuario registrado correctamente.');
            } 
            else {
                setErrorMessage('Este usuario, ya existe.');
            }
        } 
        catch (error) {
            console.error('Error al registrar usuario.', error);
            setErrorMessage('Error al registrar usuario.');
        }
    };

    const handleLogin = async () => {
        if (!username || !password) {
            setErrorMessage('CompletaR todos los campos.');
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                setLoggedIn(true);
                setErrorMessage('');
                setUsername('');
                setPassword('');
            } 
            else {
                setErrorMessage('Usuario y/o contraseña incorrectOS.');
            }
        } 
        catch (error) {
            console.error('Error al iniciar sesión', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
            });

            const data = await response.json();

            if (data.success) {
                setLoggedIn(false);
                setInfo('');
                setInfoVisible(false);
            }
        } 
        catch (error) {
            console.error('Error al cerrar sesión.', error);
        }
    };

    const handleInfo = async () => {
        try {
            if (!infoVisible) {
                const response = await fetch('/info', {
                    method: 'GET',
                });

                const data = await response.json();

                if (data.success) {
                    setInfo(`Usuario: ${data.username}\nContraseña: ${data.password}`);
                    setInfoVisible(true);
                }
            } 
            else {
                setInfo('');
                setInfoVisible(false);
            }
        } 
        catch (error) { console.error('Error al obtener información.', error);}
    };

    return (
        <div className="container">
            {!loggedIn && (

                <div className="card">
                    <h2>Registro</h2>
                    <label>
                        Usuario:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button onClick={handleRegister}>Registrar</button>

                    <button className="btnIniciarS" onClick={handleLogin}>Iniciar sesión</button>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            )}

            {loggedIn && (

                <div className="card">
                    <h2>Información Protegida</h2>

                    {infoVisible && (

                        <div className="info">  
                            <p>{info.split('\n')[0]}</p>
                            <p>{info.split('\n')[1]}</p>
                        </div>
                    )}

                    <button onClick={handleInfo}>{infoVisible ? 'Ocultar información' : 'Obtener Información'}</button>
                    <br />
                    <button className="btnCerrar" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            )}
        </div>
    );
}
