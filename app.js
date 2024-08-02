const express = require('express')
const publicRoutes = require('./routes/public.js')
const privateRoutes = require('./routes/private.js')
const MongoStore = require('connect-mongo')

// Já inicia a conexão com o banco de dados
require ('./config/database.js')


const app = express()
const port = 3000




app.use(express.json())


app.use('/users', publicRoutes) // Quando acessar /users/register com método post, ele irá rodar o código publicRoutes
app.use('/', privateRoutes)

app.listen(port, () => console.log(`Servidor rodando na porta http://localhost/${port}`)) // Deixar sempre em último