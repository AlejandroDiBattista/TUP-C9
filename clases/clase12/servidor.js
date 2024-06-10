import express from 'express';
import morgan from 'morgan'

const app = express();
app.disable("x-powered-by")

app.use(morgan('dev'))
app.use(express.json())
app.use(express.static("public"))

let contador = 1

app.get('/valor', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send(JSON.stringify({ valor: contador }))

    res.json({ valor: contador })
})

app.put('/incrementar', (req, res) => {
    const { incremento } = req.body

    contador = contador + incremento
    res.status(200)
    res.json({ valor: contador, incremento })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});