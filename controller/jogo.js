const Jogos = require('../model/jogo.js');

exports.listarJogos = async (req, res) => {
    try{
        const jogos = await Jogos.find({});
        res.status(200).send(jogos);
    } catch(erro) {
        console.log(erro);
        res.status(500).send({ msg: '[ERRO]: Erro o listar!', detalhes: erro  });
    }
}

exports.adicionarJogo = async (req, res) => {
    //req.body OU req.params OU req.query
    const novoJogo = req.body;
    if(!novoJogo.titulo || !novoJogo.classificacao) {
        res.send({ msg: '[ERRO]: Informar titulo e classificação!' });
    } else {
        try{
            await Jogos.create(novoJogo);
            res.send({ msg: '[SUCESSO]: Jogo adicionado!' });
        } catch(erro) {
            console.log(erro);
            res.send({ msg: '[ERRO]: Erro ao cadastrar', detalhes: erro  });
        }
    }
}

exports.editarJogo = async (req, res) => {
    const jogo = req.body;
    if(!jogo.titulo || !produto.jogo) {
       return res.send({ msg: '[ERRO]: Informar titulo e classificação!' });
    }
    try {
        const jogoEditado = await Jogos.findOneAndUpdate({ titulo: jogo.titulo }, { classificacao: jogo.classificacao });
        if(jogoEditado == null)
            res.send({ msg: '[AVISO]: Jogo não existe no BD!' });
        else
            res.send({ msg: '[SUCESSO]: Jogo editado!' });
    } catch(erro) {
        console.log(erro);
        res.send({ msg: '[ERRO]: Erro ao editar', detalhes: erro });
    }
}

exports.removerJogo = async (req, res) => {
    const jogo = req.body;
    if(!jogo.titulo)
       return res.send({ msg: '[ERRO]: Informar titulo!' });
    try {
        const jogoRemovido = await Jogos.findOneAndDelete({ titulo: jogo.titulo });
        if(jogoRemovido == null)
            res.send({ msg: '[AVISO]: Jogo não existe no BD!' });
        else
            res.send({ msg: '[SUCESSO]: Jogo removido!' });
    } catch(erro) {
        console.log(erro);
        res.send({ msg: '[ERRO]: Erro ao remover', detalhes: erro });
    }
}
