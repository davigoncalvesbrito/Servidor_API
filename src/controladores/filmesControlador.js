const filmes = require("../data/filmes.json")
const Filme = require("../modelos/Filme")
let id = filmes.length + 2;

function adicionarFilme(req, res) {
    // ROTA PARA  ADICIONAR 'USUARIOS' AO ARRAY

    const { titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir } = req.body; // OBTENDO O CORPO DA SOLICITAÇÃO  JSON

    const novoFilme = new Filme(id, titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir);
    const adicionou = filmes.push(novoFilme); // ADICIONANDO UM NOVO DADO AO ARRAY

    if (adicionou) {
        id++;
        return res.status(201).json({ mensagem: "Filme adicionado com sucesso", novoFilme }); // RESPOSTA COM ARRAY ATUALIZADO EM  JSON
    }

    return res.status(500).json({ mensagem: "Erro do servidor. Filme não adicionado" })

}

function editarFilme() {

}

module.exports = { adicionarFilme, editarFilme }