// Função para a API, Parte 2

const axios = require('axios');
const cron = require('node-cron');
const URL_BD = process.env.URL_BD || '';
const portaApi = 3000;
const EventEmitter = require('events');

// Criação do emissor de eventos
class JogosEventEmitter extends EventEmitter {}
const jogoEmitter = new JogosEventEmitter();

// Lista de itens para cadastro
const jogos = [
    { titulo: 'Mario Bros', classificacao: 0 },
    { titulo: 'Free Fire', classificacao: 12 },
    { titulo: 'Minecraft', classificacao: 0 },
    { titulo: 'Albion', classificacao: 10 },
    { titulo: 'Fortnite', classificacao: 12 },
    { titulo: 'PubG', classificacao: 12 },
    { titulo: 'Call of Duty', classificacao: 17 },
    { titulo: 'God of War', classificacao: 17 },
    { titulo: 'Tetris', classificacao: 5 },
    { titulo: 'Pac Man', classificacao: 4 }
];

const cadastrarJogo = async (jogos) => {
    try {
        // Simulação de uma requisição para cadastrar um item
        const response = await axios.post(URL_BD, jogo, {
            headers: {
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQxMjU1OGUyNGE4NDE2N2FmMWEwNzIiLCJ1c3VhcmlvIjoiQmVydG9kbyIsImVtYWlsIjoiYkBnbWFpbC5jb20iLCJzZW5oYSI6IiQyYiQxMCQyWUtXOGNpdXR4Z3BnUVhUbEJ5VXZlWlc0Yy5McDg1eDRHNUtlY0tmR3dicGV6TWxBL1FhVyIsIl9fdiI6MCwiaWF0IjoxNzI2MTk4OTkxLCJleHAiOjE3MjYyMDA3OTF9.RvCjGd4M96rp3KP6xHzUvw5eUWGzf8gbNWM5f4Wh_bU'
            }
        });

        if (response.status === 201) {
            jogoEmitter.emit('jogoCadastrado', jogo.titulo);
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            jogoEmitter.emit('acessoNegado');
        } else {
            console.error('[ERRO]: Ocorreu um erro ao cadastrar o item:', error.message);
        }
    }
};

const iniciarCadastro = () => {
    let jogoIndex = 0;

    cron.schedule('*/2 * * * *', () => {
        if (jogoIndex < jogos.length) {
            cadastrarItem(jogos[jogoIndex]);
            jogoIndex++;
        }
    });

    jogoEmitter.on('jogoCadastrado', (titulo) => {
        console.log(`Jogo: ${titulo} cadastrado com sucesso!`);
    });

    jogoEmitter.on('acessoNegado', () => {
        console.log('[ERRO]: Token inválido ou expirado!');
    });
};

module.exports = { iniciarCadastro };