const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.JWT_TOKEN 


function tokenVerify(req, res, next){   
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({error: 'Acesso não permitido!'})
    try{
        const decodToken = jwt.verify(token, secret) // onde a verificação acontece
        req.userId = decodToken.userId
        next()
    } catch(error){
        res.status(401).json({error:'Token inválido!'})
    }

    }   

/*
Mesmo que não haja outro middleware, você deve chamar next para garantir que o fluxo da solicitação 
continue para a próxima rota ou middleware. Se você não chamar next, a execução será interrompida, 
e o cliente não receberá uma resposta.
Nas rotas, o uso de next não é necessário da mesma forma, porque uma rota geralmente finaliza a solicitação
enviando uma resposta ao cliente. 
*/



module.exports = tokenVerify