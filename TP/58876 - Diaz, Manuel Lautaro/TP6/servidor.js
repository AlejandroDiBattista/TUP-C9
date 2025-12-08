import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));             // Logging de cada request en consola
app.use(cookieParser());            // Para leer cookies
app.use(express.json());            // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

let users = []; // Simulación de base de datos de usuarios

// Ruta para el registro de usuario
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    if (username === "BORRAR" && password === "1") {
        users = []; // Borrar todos los usuarios
        res.json({ success: true, message: 'Historial de usuarios borrado correctamente' });
        return;
    }

    // Verificar si el usuario ya existe
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        res.status(400).json({ success: false, message: 'El usuario ya existe' });
    } else {
        // Guardar el usuario en la "base de datos"
        users.push({ username, password });
        res.json({ success: true, message: 'Usuario registrado correctamente' });
    }
});

// Ruta para el login de usuario
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Verificar las credenciales del usuario
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.cookie('userSession', 'authenticated', { maxAge: 900000, httpOnly: true });
        res.cookie('username', username); // Guardar el nombre de usuario en una cookie
        res.json({ success: true, message: 'Login exitoso' });
    } else {
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
});

// Ruta para el logout de usuario
app.post('/logout', (req, res) => {
    res.clearCookie('userSession');
    res.clearCookie('username'); // Limpiar la cookie de nombre de usuario
    res.json({ success: true, message: 'Logout exitoso' });
});

// Ruta para obtener información protegida
app.get('/info', (req, res) => {
    if (req.cookies.userSession === 'authenticated') {
        // Devolver el nombre de usuario y contraseña del usuario activo
        const username = req.cookies.username;
        const user = users.find(user => user.username === username);
        if (user) {
            res.json({ success: true, username: user.username, password: user.password });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Acceso denegado' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });