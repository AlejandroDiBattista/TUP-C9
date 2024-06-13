function App() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: registerUsername, password: registerPassword }),
      });
      const data = await response.json();
      console.log(data.message);
      alert('Usuario registrado exitosamente');
      setRegisterUsername('');
      setRegisterPassword('');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      const data = await response.json();
      console.log(data.message);
      window.location.href = '/info';
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>TP6 - Sesiones</h1>
      <section>
        <h2>Registro</h2>
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
        <form onSubmit={handleLogin}>
          <label>
            Nombre de usuario:
            <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
          </label>
          <label>
            Contraseña:
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          </label>
          <button type="submit">Iniciar sesión</button>
        </form>
      </section>
    </div>
  );
}

export default App;
