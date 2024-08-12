//lógica do BD
const Jogos = require("../model/jogos.js");

exports.listarJogos = async (requisition, resposta) => {
    try {
        const jogos = await Jogos.find({});
        resposta.send(jogos);
    } catch (erro) {
        console.log(erro);
        resposta.send({ msg: '[ERRO]: Erro ao listar!', descricao: erro });
    }
}

exports.adicionarJogo = async (req, res) => {
    //req.body OU req.params OU req.query
    const novoJogo = req.headers;
    if (!novoJogo.nome || !novoJogo.preco) {
        res.send({ msg: '[ERRO]: Informar nome e preco!' })
    } else {
        try {
            await Jogos.create(novoJogo);
            res.send({ msg: '[SUCESSO]: Produto adicionado!' });
        } catch (erro) {
            console.log(erro);
            res.send({ msg: '[ERRO]: Erro ao cadastrar' });
        }

    }

    /** Pode ser assim
     * return res.send({ msg:'[ERRO]: Informar nome e preco!' })
        try {
            await Frutas.create(novaFruta);
            res.send({ msg:'[SUCESSO]: Produto adicionado!' });
        } catch(erro) {
            console.log(erro);
            res.send({ msg: '[ERRO]: Erro ao cadastrar' });
        }
     */
}

exports.editarJogo = async (req, res) => {
    const jogo = req.headers;
    if(!jogo.nome || jogo.preco) {
        return res.send({ msg: '[ERRO]: Informar nome e preco' });
    }
    try {
        const jogoEditado = await Jogos.findOneAndUpdate({ nome: jogo.nome }, { preco: jogo.preco });
        if(jogoEditado == null)
            res.send({ msg: '[AVISO]: Fruta não existe no BD!' })
        else
            res.send({ msg: '[SUCESSO]: Fruta editada' })
    } catch(erro) {
        console.log(erro);
        res.send({msg: '[ERRO]: Erro ao editar!', detalhes: erro });
    }
}

exports.removerJogo = async (req, res) => {
    const jogo = req.headers;
    if(!jogo.nome) 
        return res.send({ msg: '[ERRO]: Informar nome' });  
    try {
        const jogoEditado = await Jogos.findOneAndDelete({ nome: jogo.nome });
        if(jogoEditado == null)
            res.send({ msg: '[AVISO]: Jogo não existe no BD!' })
        else
            res.send({ msg: '[SUCESSO]: Jogo removida!' })
    } catch(erro) {
        console.log(erro);
        res.send({msg: '[ERRO]: Erro ao remover!', detalhes: erro });
    }
}