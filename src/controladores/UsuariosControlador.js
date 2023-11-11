const Usuario = require("../modelos/Usuario")
const jsonUsuarios = require("../data/usuarios.json")
const fs = require("fs/promises")
const { validationResult } = require("express-validator")

let idUsuario = jsonUsuarios.length + 1;


function adicionarUsuario(req, res) {
    try {

        //Aqui ele recebe os erros da requisição e não chega a adicionar nada caso tenha algum.
        const errors = validationResult(req);
        console.log(errors)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Recebe os atributos de usuário vindos do body da requisição
        const { nome, email, senha } = req.body; // OBTENDO O CORPO DA SOLICITAÇÃO  JSON


        //validação que ve se o filme já existe
        const usuarioEncontrado = jsonUsuarios.find(usuario => usuario.email === email);
        console.log(usuarioEncontrado)

        if (usuarioEncontrado) {
            return res.json({ mensagem: 'E-mail já está cadastrado.' })
        }
        //
        const novoUsuario = new Usuario(idUsuario, nome, email, senha);
        jsonUsuarios.push(novoUsuario);// Adiciona aos filmes

        fs.writeFile('./src/data/usuarios.json', JSON.stringify(jsonUsuarios, null, 4));//Escreve no json

        return res.json({ mensagem: 'Usuario cadastrado com sucesso.', novoUsuario })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Usuario não adicionado" })
    }

}

function editarUsuario(req, res) {

    const { id } = req.params;
    console.log(id);
    const { nome, email, senha } = req.body;

    try {
        //Procura o filme baseado no id informado no params.
        const usuarioEncontrado = jsonUsuarios.find((usuario) => usuario.id === Number(id)); //Encontra o filme pelo id.

        //Se o filme não é encontrado, retorna mensagem
        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: 'Não existe usuário a ser alterado para o ID informado.' });
        }

        //edita o usuario
        if (nome) {
            usuarioEncontrado.nome = nome;
        }
        if (email) {
            usuarioEncontrado.email = email;
        }
        if (senha) {
            usuarioEncontrado.senha = senha;
        }

        //escreve no arquivo json e retorna mensagem
        fs.writeFile('./src/data/usuarios.json', JSON.stringify(jsonUsuarios, null, 4));//Escreve no json
        return res.status(201).json({ mensagem: 'Usuario alterado', usuarioEncontrado });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Usuário não alterado" })
    }
}

function deletarUsuario(req, res) {
}

function listarUsuarios(req, res) {
    return res.status(200).json(jsonUsuarios)
}

module.exports = { adicionarUsuario, editarUsuario, deletarUsuario, listarUsuarios };