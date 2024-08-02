const express = require('express')
const session = require('express-session')
const publicRoutes = require('./routes/public.js')
const privateRoutes = require('./routes/private.js')
const MongoStore = require('connect-mongo')

// Já inicia a conexão com o banco de dados
require ('./config/database.js')


const app = express()
const port = 3000

const sess = {
    secret:'palavra chave',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/API_Cadastro', 
        collectionName: 'sessions', 
    }),
    // a parte do mongo  é para armazenar as sessões no banco de dados, podem ser reitrados, porém não seriam escaláveis
}

app.use(session(sess))
// app.use(session(sess))

app.use(express.json())


app.use('/users', publicRoutes) // Quando acessar /users/register com método post, ele irá rodar o código publicRoutes
app.use('/', privateRoutes)

app.listen(port, () => console.log(`Servidor rodando na porta http://localhost/${port}`)) // Deixar sempre em último