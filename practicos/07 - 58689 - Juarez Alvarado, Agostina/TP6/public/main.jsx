// import React, { useState } from 'https://cdn.skypack.dev/react';
// import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const register = async () => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || 'Error de registro');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const login = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setLoggedIn(true);
        alert(data.message);
      } else {
        alert(data.message || 'Error de inicio de sesión');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        setLoggedIn(false);
        setInfo(null);
        alert(data.message);
      } else {
        alert(data.message || 'Error de cierre de sesión');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const getInfo = async () => {
    try {
      const response = await fetch('/info', {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok) {
        setInfo(data);
      } else {
        alert(data.message || 'Error al obtener información');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Sesiones</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loggedIn && <button onClick={getInfo}>Get Info</button>}
      {info && (
        <div>
          <h2>Info:</h2>
          <pre>{JSON.stringify(info, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Renderiza la aplicación en el elemento con id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
