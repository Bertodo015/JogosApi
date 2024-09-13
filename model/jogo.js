const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JogosSchema = new Schema({
    titulo: { type: String, required: true, unique: true },
    classificacao: { type: Number, required: true },
    criacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Jogos', JogosSchema);