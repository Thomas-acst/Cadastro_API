const express = require('express'); 
const Cadastro = require('../models/users')
const router = express.Router()




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

        if (user.password !== password) // Se password do usuário for diferente do password obtido no req.body...
            return res.status(401).json ({error: "Senha incorreta!"})

        req.session.user = user // Armazena informações do usuário na sessão
        res.status(200).json({message: 'Login bem sucedido'})
    }catch(error){
        res.status(500).json({error : 'Erro interno do servidor registrar o usuário'})
        console.log(error)
    }   
})



router.get('/', async(req, res) => {

})









module.exports = router
