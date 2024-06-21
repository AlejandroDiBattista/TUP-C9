
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';

const app = express();
const users = {};  

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));


app.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log('Register request:', username, password);  
    if (users[username]) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users[username] = password;
    res.status(201).json({ message: 'User registered successfully' });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login request:', username, password);  
    if (users[username] && users[username] === password) {
        res.cookie('user', username, { httpOnly: true });
        return res.status(200).json({ message: 'Login successful' });
    }
    res.status(400).json({ message: 'Invalid username or password' });
});

// Logout de usuario
app.post('/logout', (req, res) => {
    console.log('Logout request');  
    res.clearCookie('user');
    res.status(200).json({ message: 'Logout successful' });
});

// Verificar sesión
app.get('/info', (req, res) => {
    const username = req.cookies.user;
    console.log('Info request, user:', username);  
    if (username) {
        return res.status(200).json({ message: `Welcome, ${username}` });
    }
    res.status(401).json({ message: 'Unauthorized' });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
