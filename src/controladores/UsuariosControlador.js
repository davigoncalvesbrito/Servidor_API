const Usuario = require("../modelos/Usuario")
const jsonUsuarios = require("../data/usuarios.json")

let idUsuario = jsonUsuarios.length + 1;


function adicionarUsuario(req, res) {
    try {
        //Recebe os atributos de usuário vindos do body da requisição
        const { nome, email } = req.body; // OBTENDO O CORPO DA SOLICITAÇÃO  JSON

        //validação que ve se o filme já existe
        const usuarioEncontrado = jsonUsuarios.find(usuario => usuario.email === email);

        if (usuarioEncontrado) {
            return res.json({ mensagem: 'Usuario já está cadastrado.' })
        }
        //
        const novoUsuario = new Usuario(idUsuario, nome, email);
        jsonUsuarios.push(novoUsuario);// Adiciona aos filmes

        fs.writeFile('./src/data/usuarios.json', JSON.stringify(jsonUsuarios, null, 4));//Escreve no json

        return res.json({ mensagem: 'Usuario cadastrado com sucesso.', novoUsuario })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Filme não adicionado" })
    }

}

function editarUsuario(req, res) {
}

function deletarUsuario(req, res) {
}

function listarUsuarios(req, res) {
    return res.status(200).json(jsonUsuariosUsuarios)
}

module.exports = { adicionarUsuario, editarUsuario, deletarUsuario, listarUsuarios };