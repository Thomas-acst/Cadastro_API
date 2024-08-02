const express = require('express');
const Cadastro = require('../models/users');
const router = express.Router();




// ROTA DE LISTAGEM DE USUÁRIOS (PRIVADA)
router.get('/', async (req, res) => {
    try {
        if (req.session.user) {
            // Aguarda o resultado da busca no banco de dados
            const users = await Cadastro.find(); // Uso do find() para buscar todos os usuários
            res.status(200).json(users);
        } else {
            res.status(401).json({ error: 'Você precisa estar logado para acessar esta rota' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno' });
        console.log(error);
    }
});


module.exports = router;
