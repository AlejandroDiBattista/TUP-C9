import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const users = {}; // Aquí guardaremos los usuarios en memoria (esto se debe cambiar a una base de datos en producción)

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos
app.use(bodyParser.urlencoded({ extended: false }));

const authMiddleware = (req, res, next) => {
    const { user } = req.cookies;
    if (user && users[user]) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ message: 'Autorizado' });
    }
};

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.json({ success: false, message: 'Usuario existente' });
    }
    users[username] = { password };
    res.cookie('ususario', username, { httpOnly: true });
    res.json({ success: true, user: username });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!users[username] || users[username].password !== password) {
        return res.json({ success: false, message: 'usuario o contraseña incorrecto' });
    }
    res.cookie('usuario', username, { httpOnly: true });
    res.json({ success: true, user: username });
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('usuario');
    res.json({ success: true });
});

app.get('/api/session', (req, res) => {
    const { user } = req.cookies;
    res.json({ user: user || null });
});

app.get('/api/info', authMiddleware, (req, res) => {
    res.json({ info: 'estos datos estan protegidos para el que inicia sesion.' });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
