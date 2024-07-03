import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde react-dom/client en lugar de react-dom

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState('');

    const handleRegister = async () => {
        if (!username.trim() || !password.trim()) {
            setMessage('Por favor ingrese usuario y contraseña.');
            return;
        }
    
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        setMessage(data.message);
    };
    
    const handleLogin = async () => {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        setMessage(data.message);
        if (response.ok) {
            setIsLoggedIn(true);
            setUserInfo(`Bienvenido, ${username}. Usted ha sido logueado con éxito.`);
        }
    };

    const handleLogout = async () => {
        const response = await fetch('/logout', { method: 'POST' });
        const data = await response.json();
        setMessage(data.message);
        setIsLoggedIn(false);
        setUserInfo('');
    };

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            {isLoggedIn ? (
                <div>
                    <p>{userInfo}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input 
                        type="text" 
                        placeholder="Usuario" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <button onClick={handleRegister}>Registrar</button>
                    <button onClick={handleLogin}>Login</button>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
