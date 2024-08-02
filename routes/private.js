const express = require('express');
const Cadastro = require('../models/users');
const router = express.Router();
const tokenVerify = require('../controller/auth')




// ROTA DE LISTAGEM DE USUÁRIOS (PRIVADA)
router.get('/', tokenVerify, async (req, res) => {
    try {   
        let db = await Cadastro.find()
        res.status(200).json({ message: 'Usuário Logado', db: db})
    } catch (error) {
        res.status(500).json({ error: 'Erro interno' });
        console.error(error)
        
    }
});


module.exports = router;
