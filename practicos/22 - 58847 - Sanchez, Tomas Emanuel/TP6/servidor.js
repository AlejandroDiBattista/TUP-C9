import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

let users = {};

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users[username] = { password };
    res.status(200).json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (user && user.password === password) {
        req.session.user = username;
        return res.status(200).json({ message: 'Login successful' });
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
});

app.get('/api/info', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ info: 'This is some protected information' });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
