const {useState} = React;

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');
    const [infVis, setInfoVis] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {

        if (!username || !password) {
            setErrorMessage('Completar todos los campos.');
            return;
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                setErrorMessage('');
                setUsername('');
                setPassword('');
               setErrorMessage('Usuario registrado correctamente.');
            } 
            else {
                setErrorMessage('Este usuario ya es existente.');
            }

        } 
        catch (error) {
            console.error('Error al registrar el usuario.', error);
            setErrorMessage('Error al registrar el usuario.');
        }
    };

    const handleLogin = async () => {

        if (!username || !password) {
            setErrorMessage('Error, debe completar todos los espacios.');
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                setLoggedIn(true);
                setErrorMessage('');
                setUsername('');
                setPassword('');
            } 
            else {
                setErrorMessage('Usuario y contraseña incorrectos.');
            }
        } 
        catch (error) {
            console.error('Error al iniciar sesión.', error);
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
                setInfoVis(false);
            }

        }
        catch (error) {
            console.error('Error al cerrar sesión.', error);
        }
    };

    const handleInfo = async () => {
        try {
            if (!infVis) {
                const response = await fetch('/info', {
                    method: 'GET',
                });

                const data = await response.json();

                if (data.success) {
                    setInfo(`Usuario: ${data.username}\nContraseña: ${data.password}`);
                    setInfoVis(true);
                }
            } 
            else {
                setInfo('');
                setInfoVis(false);
            }
        } 
        catch (error) {
            console.error('Error al obtener información.', error);
        }
    };

    return (
        <div className="container">
            {!loggedIn && (
                <form className="card">
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
                    <button onClick={handleLogin}>Iniciar sesión</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            )}
            {loggedIn && (
                // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                <div className="card">
                    <h2>Información Protegida</h2>
                    {infVis && (
                        <div className="info">  
                            <p>{info.split('\n')[0]}</p>
                            <p>{info.split('\n')[1]}</p>
                        </div>
                    )}
                    <button onClick={handleInfo}>{infVis ? 'Ocultar información' : 'Obtener Información'}</button>
                    <br />
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            )}
        </div>
    );
}
