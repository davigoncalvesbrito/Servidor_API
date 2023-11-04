const filmes = require("../data/filmes.json") //Arquivo Json
const Filme = require("../modelos/Filme") //Classe Filme.js
const fs = require("fs/promises")

let id = filmes.length + 2;

function adicionarFilme(req, res) {
    try {

        // ROTA PARA  ADICIONAR 'USUARIOS' AO ARRAY
        const { titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir } = req.body; // OBTENDO O CORPO DA SOLICITAÇÃO  JSON

        //validação que ve se o filme já existe
        const filmeEncontrado = filmes.find(filme => filme.titulo === titulo && filme.diretor == diretor);

        if (filmeEncontrado) {
            return res.json({ mensagem: 'Filme já está cadastrado.' })
        }

        const novoFilme = new Filme(id, titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir);
        filmes.push(novoFilme);

        fs.writeFile('./src/data/filmes.json', JSON.stringify(filmes));

        return res.json({ mensagem: 'Filme cadastrado com sucesso.' })


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Filme não adicionado" })
    }
}

function editarFilme(req, res) {

    const { id } = req.params;
    const { titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir } = req.body;

    const filmeEncontrado = filmes.find((filme) => {
        return filme.id === Number(id);
    });

    if (!filmeEncontrado) {
        return res.status(404).json({ mensagem: 'Não existe filme a ser alterado para o ID informado.' });
    }

    filmeEncontrado.titulo = titulo
    filmeEncontrado.diretor = diretor
    filmeEncontrado.lancamento = lancamento
    filmeEncontrado.genero = genero
    filmeEncontrado.descricao = descricao
    filmeEncontrado.imagem = imagem
    filmeEncontrado.ondeAssistir = ondeAssistir

    return res.json({ mensagem: 'Filme alterado', filmeEncontrado });

}

function listarFilme(req, res) {

    return res.status(200).json(filmes)
}

module.exports = { adicionarFilme, editarFilme, listarFilme }