// servidor.js
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';

const app = express();
const usuarios = {}; 

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

// Registro de usuario
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log('Solicitud de registro:', username, password); 


    if (usuarios[username]) {
        return res.status(400).json({ message: 'Ya existe un usuario.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    usuarios[username] = password;
    res.status(201).json({ message: 'Registrado con éxito.' });
});


// Inicio de sesión de usuario
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Solicitud de inicio de sesión:', username, password);  
    if (usuarios[username] && usuarios[username] === password) {
        res.cookie('user', username, { httpOnly: true });
        return res.status(200).json({ message: 'Inició sesión con éxito.' });
    }
    res.status(400).json({ message: 'Nombre de usuario o contraseña inválidos.' });
});

// Cierre de sesión de usuario
app.post('/logout', (req, res) => {
    console.log('Solicitud de cierre de sesión'); 
    res.clearCookie('user');
    res.status(200).json({ message: 'Se cerró la sesión correctamente.' });
});

// Verificar sesión
app.get('/info', (req, res) => {
    const username = req.cookies.user;
    console.log('Solicitud de información, usuario:', username); 
    if (username) {
        return res.status(200).json({ message: `Bienvenido ${username}, estas en el apartado para usuarios.` });
    }
    res.status(401).json({ message: 'No autorizado' });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
