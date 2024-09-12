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
    if (!novoJogo.titulo || !novoJogo.classificacao || !novoJogo.plataforma || !novoJogo.modelo || !novoJogo.numJogadores) {
        res.send({ msg: '[ERRO]: Informar titulo, classificação, plataforma e modelo!' })
    } else {
        try {
            await Frutas.create(novoJogo);
            res.send({ msg: '[SUCESSO]: Jogo adicionado!' });
        } catch (erro) {
            console.log(erro);
            res.send({ msg: '[ERRO]: Erro ao cadastrar' });
        }

    }
}

exports.editarJogo = async (req, res) => {
    const jogo = req.headers;
    if(!novoJogo.titulo || !novoJogo.classificacao || !novoJogo.plataforma || !novoJogo.modelo || !novoJogo.numJogadores) {
        return res.send({ msg: '[ERRO]: Informar Informar titulo, classificação, plataforma, modelo e número de jogadores!' });
    }
    try {
        const jogoEditado = await Jogos.findOneAndUpdate({ titulo: jogo.titulo }, { classificacao: jogo.classificacao }, { plataforma: jogo.plataforma }, { modelo: jogo.modelo }, { numJogadores: jogo.numJogadores});
        if (jogoEditado == null)
            res.send({ msg: '[AVISO]: Jogo não existe no BD!' })
        else
            res.send({ msg: '[SUCESSO]: Jogo editado!' })
    } catch (erro) {
        console.log(erro);
        res.send({ msg: '[ERRO]: Erro ao editar!', detalhes: erro });
    }
}

exports.removerJogo = async (req, res) => {
    const jogo = req.headers;
    if (!jogo.titulo)
        return res.send({ msg: '[ERRO]: Informar titulo!' });
    try {
        const jogoEditado = await Jogos.findOneAndDelete({ titulo: jogo.titulo });
        if (jogoEditado == null)
            res.send({ msg: '[AVISO]: Jogo não existe no BD!' })
        else
            res.send({ msg: '[SUCESSO]: Jogo removido!' })
    } catch (erro) {
        console.log(erro);
        res.send({ msg: '[ERRO]: Erro ao remover!', detalhes: erro });
    }
}