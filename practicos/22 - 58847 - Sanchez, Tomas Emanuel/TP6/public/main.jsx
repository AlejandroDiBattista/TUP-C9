function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [info, setInfo] = React.useState('');

    const handleLogin = async (username, password) => { // Verificar        
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            setIsLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = async () => {
        await fetch('http://localhost:3000/api/logout', {
            method: 'POST'
        });
        setIsLoggedIn(false);
    };

    const handleRegister = async (username, password) => {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('User registered successfully');
            setIsRegistered(true);
        } else {
            alert('Registration failed');
        }
    };

    const fetchInfo = async () => {
        const response = await fetch('http://localhost:3000/api/info');
        if (response.ok) {
            const data = await response.json();
            setInfo(data.info);
        } else {
            alert('You need to log in to view this information');
        }
    };

    const showLogin = () => {
        setIsRegistered(true);
    };

    return (
        <div>
            <h1>RappID TECH</h1>
            {!isLoggedIn ? (
                !isRegistered ? (
                    <Register onRegister={handleRegister} showLogin={showLogin} />
                ) : (
                    <Login onLogin={handleLogin} />
                )
            ) : (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <Info onFetchInfo={fetchInfo} info={info} />
                </>
            )}
        </div>
    );
}

function Login({ onLogin }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login form</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
            
        </form>
    );
}

function Register({ onRegister, showLogin }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register form</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Register</button>
            <p>Already registered? <a href="#" onClick={showLogin}>Login here</a></p>
        </form>
    );
}

function Info({ onFetchInfo, info }) {
    React.useEffect(() => {
        onFetchInfo();
    }, []);

    // Función para generar información aleatoria
    const generateRandomInfo = () => {
        const services = [
            'Desarrollo de sitios web responsivos',
            'Aplicaciones web personalizadas',
            'Diseño UX/UI enfocado en el usuario',
            'Optimización SEO para alto rendimiento',
            'Integración de sistemas y APIs',
            'Mantenimiento y soporte técnico continuo',
            'Desarrollo de aplicaciones móviles'
        ];

        const technologies = [
            'React.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'MySQL',
            'Firebase',
            'AWS',
            'Docker',
            'GraphQL'
        ];

        const achievements = [
            'Más de 100 clientes satisfechos',
            'Premio al Mejor Diseño Web 2023',
            'Certificación ISO 9001 en desarrollo de software',
            'Publicación destacada en TechCrunch',
            'Colaboración con startups innovadoras'
        ];

        // Generar un mensaje aleatorio combinando servicios, tecnologías y logros
        const randomService = services[Math.floor(Math.random() * services.length)];
        const randomTechnology = technologies[Math.floor(Math.random() * technologies.length)];
        const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];

        return `Ofrecemos ${randomService} utilizando ${randomTechnology}. ${randomAchievement}.`;
    };

    return (
        <div className="info">
            <h2>Info</h2>
            <p>{generateRandomInfo()}</p>
        </div>
    );
}