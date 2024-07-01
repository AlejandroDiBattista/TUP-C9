import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
const users = {};  

app.use(morgan('dev'));     
app.use(cookieParser());    
app.use(express.json());    
app.use(express.static('public'));  

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    users[username] = password;
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) { // Verificar
        res.cookie('user', username, { httpOnly: true });
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    }
    res.status(400).json({ message: 'Usuario o contraseña inválido' });
});

app.post('/logout', (req, res) => {

    res.clearCookie('user');
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
});


app.get('/info', (req, res) => {
    const username = req.cookies.user;
    if (username) {
        return res.status(200).json({ message: `Bienvenido, ${username}` });
    }
    res.status(401).json({ message: 'No autorizado' });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
