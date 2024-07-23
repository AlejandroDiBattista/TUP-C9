function App() {
    const [logueado, setLogueado] = useState(false)
    const [error, setError] = useState('')

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/register', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    username: event.target.username.value,
                    password: event.target.password.value,
                })
            });

            if (response.status === 409) {
                setError('El nombre de usuario ya está en uso');
                return
            }
            alert('Usuario registrado exitosamente');
            
        } catch (error) {
            console.error(error.message)
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch('/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value,
            })
          });
    
          if (response.status === 400) {
            setError('Usuario o contraseña son incorrectos')
            return
          } 

          alert('Inicio de sesión exitoso');
          setLogueado(true)

        } catch (error) {
          if (error.response && error.response.status === 400) {
            alert('Usuario o contraseña incorrectos');
          } else {
            console.error('Error al iniciar sesión:', error);
          }
        }
    };

    const handleOut = async () => {
        try {
            const response = await fetch('/logout')
            if (response.status === 200){
                alert('Sesión cerrada')
                setLogueado(false)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleInfo = async () => {
        if (!logueado) {
            alert('Debe iniciar sesión')
        }
        try {
            const response = await fetch('/info')
            const data = await response.json()
            alert(data.message)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            {error && <p>{error}</p>}
            <main>
                <section>
                    <form onSubmit={handleRegister}>
                        <h2>Registro</h2>
                        <label htmlFor="username">Nombre de usuario:
                            <input type="text" id="username" name="username" required />
                        </label>
                        <label htmlFor="password">Contraseña:
                            <input type="password" id="password" name="password" required />
                        </label>
                        <button type="submit">Registrarse</button>
                    </form>
                </section>
                <section>
                    <form onSubmit={handleLogin}>
                        <h2>Inicio de sesión</h2>
                        <label htmlFor="username">Nombre de usuario:
                            <input type="text" id="username" name="username" required />
                        </label>
                        <label htmlFor="password">Contraseña:
                            <input type="password" id="password" name="password" required />
                        </label>
                        <button type="submit">Iniciar sesión</button>
                    </form>
                </section>
                <section>
                    <h2>Logout/Info</h2>
                    <button onClick={handleOut}>Cerrar sesión</button>
                    <button onClick={handleInfo}>Información</button>
                </section>
            </main>
        </div>
    )
}