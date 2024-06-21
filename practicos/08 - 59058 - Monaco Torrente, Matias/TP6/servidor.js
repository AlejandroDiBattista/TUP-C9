import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
const usuarios = {}; // Aquí guardaremos los usuarios en memoria (no recomendado para producción)

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para leer datos de formularios
app.use(express.static('public'));

// Registrar usuario
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (usuarios[username]) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }
    usuarios[username] = { password };
    res.status(201).json({ message: 'Usuario registrado' });
});

// Login de usuario
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const usuario = usuarios[username];
    if (usuario && usuario.password === password) {
        res.cookie('session', username, { httpOnly: true });
        return res.json({ message: 'Login exitoso' });
    }
    res.status(401).json({ message: 'Credenciales inválidas' });
});

// Logout de usuario
app.post('/logout', (req, res) => {
    res.clearCookie('session');
    res.json({ message: 'Logout exitoso' });
});

// Página de información protegida
app.get('/info', (req, res) => {
    const sesion = req.cookies.session;
    if (sesion && usuarios[sesion]) {
        return res.json({ message: `Información protegida para ${sesion}` });
    }
    res.status(401).json({ message: 'No autorizado' });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
