/**
 * Para instalar o mongoose
 * npm i mongoose
 * npm i express mongoose
 */
const express = require('express');
const api = express();
const URL_BD = 'mongodb+srv://bertolomeu:sorvete@cluster0.frldmhm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const portaApi = 3000;
const mongoose = require('mongoose');

mongoose.connect(URL_BD);

//para ter um feedback de que deu certo
mongoose.connection.on('connected', ()=> {
    console.log('API conectada ao BD!');
});
//function() {} é similar a () => {}

mongoose.connection.on('disconnected', ()=> {
    console.log('API desconectada do BD!');
});

mongoose.connection.on('error', (erro)=> {
    console.log('Erro ao conectar no BD!', erro);
});

api.get('/status', function (req, res) {
    res.send('<h3>API Online!</h3>');
})

api.listen(portaApi, function() {
    console.log('API Online!');
});

const frutasController = require("./controller/jogos.js");
api.get('/jogos', jogosController.listarJogos);
//POST para adicionar
api.post('/jogo', jogosController.adicionarJogo);
//PUT para editar
api.put('/jogo', jogosController.editarJogo);
//DELETE para remover
api.delete('/jogo', jogosController.removerJogo);