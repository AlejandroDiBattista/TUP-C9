function App() {
    const [mensaje, setMensaje] = useState('');
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [mostrarRegistrar, setMostrarRegistrar] = useState(false);

    async function traer (ruta, metodo = 'GET', body = {}){
        let res = await fetch(ruta, {
            method: metodo,
            headers: {'Content-Type': 'application/json'},
            body: metodo === 'POST' ? JSON.stringify(body) : null,
        });
        let data = await res.text()
        setMensaje(data)
    }

    async function login(event){
        event.preventDefault()
        let usuario = {user: event.target.user.value, password: event.target.password.value};
        traer('/login', 'POST', usuario)
    }

    async function registrar(event){
        event.preventDefault()
        let usuario = {user: event.target.user.value, password: event.target.password.value};
        traer('/registrar', 'POST', usuario)
    }

    async function logout(){
        traer('/logout', 'POST')
    }

    async function ver(){
        traer('/info')
    }

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            <button onClick={() => { setMostrarRegistrar(true); setMostrarLogin(false); }}>Registrar</button>
            <button onClick={() => { setMostrarLogin(true); setMostrarRegistrar(false); }}>Login</button>
            <button onClick={logout}>Cerrar Sesión</button>
            <button onClick={ver}>Ver Informacion</button>
            
            {mostrarLogin && (
                <form onSubmit={login}>
                    <h3>Login</h3>
                    <label>
                        Usuario:
                        <input type="text" name="user" required />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="password" required />
                    </label>
                    <button type="submit">Iniciar Sesión</button>
                </form>
            )}
            
            {mostrarRegistrar && (
                <form onSubmit={registrar}>
                    <h3>Registrar</h3>
                    <label>
                        Usuario:
                        <input type="text" name="user" required />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="password" required />
                    </label>
                    <button type="submit">Registrar</button>
                </form>
            )}
            
            <pre>{mensaje}</pre>
        </div>
    )
}
