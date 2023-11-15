const express = require("express");
const rotas = express.Router();
const fs = require('fs');

const filmes = require("./data/filmes.json");
const { adicionarFilme, editarFilme, listarFilme, removerFilme } = require("./controladores/filmeControlador")
const { adicionarUsuario, listarUsuarios, editarUsuario, deletarUsuario } = require("./controladores/usuarioControlador") //Importando controlador Filmes
const { adicionarAvaliacao, editarAvaliacao, listarAvaliacao, removerAvaliacao } = require("./controladores/avaliacaoControlador");
const { body, validationResult } = require("express-validator")
const validarPostUsuario = require("./util/validacoes/validarUsuario")
const validarPostFilme = require("./util/validacoes/validarFilme")
const validarPostAvaliacao = require("./util/validacoes/validarAval")
const controladorValidacao = require("./util/middleware/controladorValidacao")


/* ----------ROTAS GET --------->  */
rotas.get("/listarfilme", listarFilme)
rotas.get("/listarusuario", listarUsuarios)
rotas.get("/listaravaliacao", listarAvaliacao)
//pode montar localhost:3000/avaliacao?idUsuario=4 no navegador
//pode montar localhost:3000/avaliacao?idFilme=4 no navegador


/* ----------ROTAS POST --------->  */
//Inserir Filme / Usuario / Avaliacao /Realizar login
rotas.post("/addusuario", validarPostUsuario, controladorValidacao, adicionarUsuario)
rotas.post(`/addfilme`, validarPostFilme, controladorValidacao, adicionarFilme);
rotas.post("/addavaliacao", validarPostAvaliacao, controladorValidacao, adicionarAvaliacao)

rotas.post('/usuarios/login', (req, res) => {
    const { email, senha } = req.body;

    // Biblioteca para acessar a pasta 'usuarios.json'
    const path = require('path');
    const usuariosPath = path.join(__dirname, 'data', 'usuarios.json');
    const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf-8'));

    // Encontra o usuário com base no e-mail e senha
    const usuarioAutenticado = usuarios.find((usuario) => usuario.email === email && usuario.senha === senha);

    if (usuarioAutenticado) {
        // Inclua o nome do usuário na resposta
        res.json({ autenticado: true, mensagem: 'Login bem-sucedido!', nome: usuarioAutenticado.nome });
    } else {
        res.status(401).json({ autenticado: false, mensagem: 'Credenciais inválidas. Tente novamente.' });
    }
});
rotas.post('/usuarios/verificar-token', (req, res) => {
    const token = req.body.token;

    // Aqui você deve implementar a lógica para verificar se o token é válido no seu servidor
    // Se for válido, retorne informações do usuário (como nome) junto com um status de sucesso
    // Se não for válido, retorne um status de erro ou token inválido

    // Exemplo básico (não seguro, apenas para ilustração)
    if (token === 'token_valido') {
        res.json({ autenticado: true, nomeUsuario: 'Nome do Usuário' });
    } else {
        res.status(401).json({ autenticado: false, mensagem: 'Token inválido' });
    }
});

/* ----------ROTAS PUT --------->  */
//Editar Filme / Usuario
rotas.put('/editarfilme/:id', validarPostFilme, controladorValidacao, editarFilme)
rotas.put('/editarusuario/:id', validarPostUsuario, controladorValidacao, editarUsuario)
rotas.put("/editaravaliacao", validarPostAvaliacao, controladorValidacao, editarAvaliacao)



/* ----------ROTAS Delete --------->  */
//Remover filme / Usuario
rotas.delete("/deletarfilme/:id", removerFilme)
rotas.delete("/deletarusuario/:id", deletarUsuario)
rotas.delete("/deletaravaliacao/:id", removerAvaliacao)


module.exports = rotas; //EXPORTANDO ROTAS
