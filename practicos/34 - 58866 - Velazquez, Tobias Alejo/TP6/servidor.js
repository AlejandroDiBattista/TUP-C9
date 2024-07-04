import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';


const app = express();
const users = {}; 

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json())
app.use(express.static('public'));

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (users[username]) {
        return res.status(400).json({ message: 'El usuario ya ha sido registrado.' });
    }



        users[username] = password;
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) { // Verificar
        res.cookie('user', username, { httpOnly: true });
        return res.status(200).json({ message: 'Inicio exitoso' });
    }
    res.status(400).json({ message: 'Usuario/Contraseña incorrecta.' });
});


app.post('/logout', (req, res) => {

    res.clearCookie('user');
    res.status(200).json({ message: 'Sesión cerrada.' });
});

app.get('/info', (req, res) => {
    const username = req.cookies.user;

    if (username) {
        return res.status(200).json({ message: `Bienvenido, ${username}` });
    }
    res.status(401).json({ message: 'Error' });
});

// Implementar las rutas necesarias
app.listen(3001, () => {
    console.log('Servidor iniciado en http://localhost:3001');
});
