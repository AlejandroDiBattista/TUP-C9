function App() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    if (isLoggedIn) {
      try {
        const response = await fetch('/info');
        if (response.status === 200) {
          const data = await response.json();
          setInfoMessage(data.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };  

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerUsername || !registerPassword) {
      setRegisterError('El nombre de usuario y la contraseña son requeridos');
      return;
    }
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: registerUsername, password: registerPassword }),
      });
      if (response.status === 409) {
        setRegisterError('El nombre de usuario ya existe');
        return;
      }
      const data = await response.json();
      console.log(data.message);
      alert('Usuario registrado exitosamente');
      setRegisterUsername('');
      setRegisterPassword('');
      setRegisterError('');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      setLoginError('El nombre de usuario y la contraseña son requeridos');
      return;
    }
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      if (response.status === 401) {
        setLoginError('Credenciales inválidas');
        return;
      }
      const data = await response.json();
      console.log(data.message);
      setIsLoggedIn(true);
      setWelcomeMessage(`${loginUsername}`);
      alert('Inicio de sesión exitoso');
      setLoginError('');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout');
      if (response.status === 200) {
        setIsLoggedIn(false);
        setInfoMessage('');
        setWelcomeMessage('');
        alert('Sesión cerrada exitosamente');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInfo = async () => {
    if (!isLoggedIn) {
      alert('Debes iniciar sesión primero');
      return;
    }
    try {
      const response = await fetch('/info');
      const data = await response.json();
      setInfoMessage(data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>TP6 - Sesiones</h1>
      <section>
        <h2>Registro</h2>
        {registerError && <p style={{color:"red"}}>{registerError}</p>}
        <form onSubmit={handleRegister}>
          <label>
            Nombre de usuario:
            <input type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
          </label>
          <label>
            Contraseña:
            <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
          </label>
          <button type="submit">Registrarse</button>
        </form>
      </section>
      <section>
        <h2>Inicio de sesión</h2>
        {loginError && <p style={{color:"red"}}>{loginError}</p>}
        <form onSubmit={handleLogin}>
          <label>
            Nombre de usuario:
            <input type="text" value={loginUsername
            } onChange={(e) => setLoginUsername(e.target.value)} />
          </label>
          <label>
            Contraseña:
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          </label>
          <button type="submit">Iniciar sesión</button>
        </form>
      </section>
      {isLoggedIn && (
        <section>
          <h2>Bienvenido {welcomeMessage}</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>
          <button onClick={handleInfo}>Obtener información</button>
          {infoMessage && <p>{infoMessage}</p>}
        </section>
      )}
    </div>
  );
};