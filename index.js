const express = require('express');
const api = express();
const bodyParser = require('body-parser');
api.use(bodyParser.json());
require('dotenv').config();
const URL_BD = process.env.URL_BD || '';
const portaApi = 3000;
const mongoose = require('mongoose');

mongoose.connect(URL_BD);

mongoose.connection.on('connected', () => {
    console.log('API conectada ao BD!');
});

mongoose.connection.on('disconnected', () => {
    console.log('API foi desconectada do BD!');
});

mongoose.connection.on('error', (erro) => {
    console.log('Erro ao conectar no BD! ', erro);
});

//function() {} é similar a () => {}

api.get('/status', function (req, res) {
    res.send('<h3>API Online!</h3>');
});

api.listen(portaApi, function() {
    console.log('API Online!');
});

const jogosController = require('./controller/jogo.js');
const usuarioController = require('./controller/usuario.js');
const autenticacao = require('./middlewares/autenticacao.js');

api.post('/login', autenticacao.logar);
api.post('/usuario', usuarioController.registrarUsuario);
api.get('/jogos', autenticacao.autenticar, jogosController.listarJogos);
api.post('/jogo', autenticacao.autenticar, jogosController.adicionarJogo);
api.put('/jogo', autenticacao.autenticar, jogosController.editarJogo);
api.delete('/jogo', autenticacao.autenticar, jogosController.removerJogo);

const { iniciarCadastro } = require('./emissor/emissor_jogos.js');

// Inicia o processo de cadastro
iniciarCadastro();
