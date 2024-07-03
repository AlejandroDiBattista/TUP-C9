import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());


const users = [];


app.use(express.static('public'));


app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }
    users.push({ username, password });
    res.status(201).json({ message: 'Usuario registrado con éxito' });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    res.cookie('username', username, { httpOnly: true });
    res.json({ message: 'Login exitoso' });
});


app.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.json({ message: 'Logout exitoso' });
});


app.get('/info', (req, res) => {
    const { username } = req.cookies;
    if (!username) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    res.json({ message: `Información para ${username}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
