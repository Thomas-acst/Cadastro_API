require('dotenv').config()
const express = require('express'); 
const Cadastro = require('../models/users')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.JWT_TOKEN 


// ROTA DE CADASTRO (PÚBLICA)
router.post('/register', async(req, res) => {
    const {name, email, password} = req.body; // significa que estamos extraindo as propriedades name, email e password do objeto req.body.
    const user = new Cadastro({name, email, password}) // cria uma instacia de cadastro denominada usuário com os dados obtidos a partir do req.body
    
    try{
        await user.save() // Tenta salvar o usuário
        res.status(200).json(user)
        console.log('Usuário salvo com sucesso!')
    }catch(error){
        res.status(500).json({error : 'Erro ao registrar o usuário'})
        console.log(error)
    }

})




// ROTA DE LOGIN (PÚBLICA)
router.post('/login', async(req, res) => {
    const {email, password} = req.body; // Pegando email e senha do body

    if (!email || !password) { // Se email ou senha estiverem vazios...
        return res.status(401).json({erro: 'Dados insufucuentes!'})
    }
    try{
        let user = await Cadastro.findOne({ email }) // user será igual a exitência de um usuário com mesmo email
        if (!user) // Se user não existir 
            return res.status(401).json({error: "Não existe um usuário com este e-mail!"})    

        bcrypt.compare(password, user.password, (err, result) => { // compara o input com o hash armazenado
            if (err){
                res.status(401).json({error: "A senha digitada está incorreta!"})
                console.error(err)
                return
            } else{
                const token = jwt.sign({userId: user._id}, secret, {expiresIn: '1h'}) //userId receberá user._id armazenado no DB
                res.status(200).json({message: 'Login bem sucedido', token:token})
            }}) 
    }catch(error){
        res.status(500).json({error : 'Erro interno do servidor registrar o usuário'})
        console.log(error)
    }   
})



router.get('/', async(req, res) => {

})









module.exports = router
