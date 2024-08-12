//definição da tabela
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JogosSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    preco: { type: Number, required: true },
    criacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Jogos', JogosSchema);