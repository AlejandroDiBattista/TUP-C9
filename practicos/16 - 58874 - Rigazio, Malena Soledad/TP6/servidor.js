import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));


let usuarios = [];


app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    if (username === "BORRAR" && password === "1") {
        usuarios = [];
        res.json({ success: true, message: 'El historial de usuarios ha sido borrado correctamente.' });
        return;
    }

    const existingUser = usuarios.find(user => user.username === username);
    if (existingUser) { res.status(400).json({ success: false, message: 'Usuario existente.' });
    } 
    else {
        usuarios.push({ username, password });
        res.json({ success: true, message: 'Usuario registrado correctamente.' });
    }
});


app.post('/login', (req, res) => {

    const { username, password } = req.body;
    const user = usuarios.find(user => user.username === username && user.password === password);

    if (user) {
        res.cookie('userSession', 'authenticated', { maxAge: 900000, httpOnly: true });
        res.cookie('username', username);
        res.json({ success: true, message: 'Login exitoso.' });
    } 
    else { res.status(401).json({ success: false, message: 'Credenciales incorrectas.' }); }
});


app.post('/logout', (req, res) => {
    res.clearCookie('userSession');
    res.clearCookie('username');
    res.json({ success: true, message: 'Logout exitoso' });
});


app.get('/info', (req, res) => {

    if (req.cookies.userSession === 'authenticated') {
        const username = req.cookies.username;
        const user = usuarios.find(user => user.username === username);

        if (user) { res.json({ success: true, username: user.username, password: user.password });
        } 
        else { res.status(404).json({ success: false, message: 'Usuario no encontrado' }); }
    } 
    else {
        res.status(401).json({ success: false, message: 'Acceso denegado' });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });