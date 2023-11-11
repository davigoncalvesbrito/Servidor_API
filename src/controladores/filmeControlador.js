const jsonFilmes = require("../data/filmes.json") //Arquivo Json
const filmeModel = require("../modelos/Filme") //Classe Filme.js
const fs = require("fs/promises")
const { validationResult } = require("express-validator")

let idFilme = jsonFilmes.length + 2; //Usado para setar o id do filme automaticamente

function adicionarFilme(req, res) {
    try {

        //Aqui ele recebe os erros da requisição e não chega a adicionar nada caso tenha algum.
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Recebe os atributos de usuário vindos do body da requisição
        const { titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir } = req.body; // OBTENDO O CORPO DA SOLICITAÇÃO  JSON

        //validação que ve se o filme já existe
        const filmeEncontrado = jsonFilmes.find(filme => filme.titulo === titulo && filme.diretor == diretor);

        if (filmeEncontrado) {
            return res.json({ mensagem: 'Filme já está cadastrado.' })
        }
        //
        const novoFilme = new filmeModel(idFilme, titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir);
        jsonFilmes.push(novoFilme);// Adiciona aos filmes

        fs.writeFile('./src/data/filmes.json', JSON.stringify(jsonFilmes, null, 4));//Escreve no json

        return res.json({ mensagem: 'Filme cadastrado com sucesso.', novoFilme })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Filme não adicionado" })
    }
}

function editarFilme(req, res) {

    const { id } = req.params;
    console.log(id);
    const { titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir } = req.body;

    try {
        //Procura o filme baseado no id informado no params.
        const filmeEncontrado = jsonFilmes.find((filme) => filme.id === Number(id)); //Encontra o filme pelo id.
        console.log(filmeEncontrado)

        //Se o filme não é encontrado, retorna mensagem
        if (!filmeEncontrado) {
            return res.status(404).json({ mensagem: 'Não existe filme a ser alterado para o ID informado.' });
        }

        //edita o filme
        filmeEncontrado.titulo = titulo
        filmeEncontrado.diretor = diretor
        filmeEncontrado.lancamento = lancamento
        filmeEncontrado.genero = genero
        filmeEncontrado.descricao = descricao
        filmeEncontrado.imagem = imagem
        filmeEncontrado.ondeAssistir = ondeAssistir

        //escreve no arquivo json e retorna mensagem
        fs.writeFile('./src/data/filmes.json', JSON.stringify(jsonFilmes, null, 4));//Escreve no json
        return res.status(201).json({ mensagem: 'Filme alterado', filmeEncontrado });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Filme não alterado" })
    }
}

function listarFilme(req, res) {

    return res.status(200).json(jsonFilmes)
}

function removerFilme(req, res) {
    const { id } = req.params;
    console.log(id)

    try {
        //Procura o index do filme conformeo id informado no params.
        const filmesEncontrado = jsonFilmes.find(filme => filme.id === Number(id));

        // Se o filme não for localizado retorna a mensagem abaixo.
        if (!filmesEncontrado) {
            return res.status(404).json({ mensagem: 'Não existe filme para o ID informado.' });
        }

        //Já que o filme existe, exclui através do id usando o splice
        const filmeIndex = jsonFilmes.findIndex(filme => filme.id === Number(id));
        jsonFilmes.splice(filmeIndex, 1);

        fs.writeFile('./src/data/filmes.json', JSON.stringify(jsonFilmes, null, 4));//Escreve no json
        //return res.status(200).json({ mensagem: "Filme excluído com sucesso!"}); 
        return res.json({ mensagem: "Filme excluído com sucesso!" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Filme não removido" })
    }
}

module.exports = { adicionarFilme, editarFilme, listarFilme, removerFilme }