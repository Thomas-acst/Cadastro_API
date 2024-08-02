const mongoose = require('mongoose')

async function conectar(){
    await mongoose.connect('mongodb://localhost/API_Cadastro')
    .then(() => console.log('conexão bem sucedida com o banco'))
    .catch((err) => console.log('conexão falha com o banco de dados: '+ err))
}

conectar()