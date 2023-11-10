const express = require("express");
const rotas = express.Router();
const filmes = require("./data/filmes.json");
const { adicionarFilme, editarFilme, listarFilme, removerFilme } = require("./controladores/filmesControlador")
const { adicionarUsuario, listarUsuarios } = require("./controladores/UsuariosControlador") //Importando controlador Filmes
const { body, validationResult } = require("express-validator")


// JSON FILMES (GET = BUSCAR OU SELECIONAR DADOS)
rotas.get("/filmes", listarFilme);
rotas.get("/usuarios", listarUsuarios)

//POST = INSERIR FILME
rotas.post(`/filme`,
  [
    body('titulo').notEmpty().withMessage("O campo título é obrigatório"),
    body('diretor').notEmpty().withMessage("O campo diretor é obrigatório"),
    body('lancamento').notEmpty().withMessage("O campo lançamento é obrigatório"),
    body('genero').notEmpty().withMessage("O campo gênero é obrigatório"),
    body('descricao').notEmpty().withMessage("O campo descrição é obrigatório"),
    body('imagem').notEmpty().withMessage("O campo imagem é obrigatório"),

  ], adicionarFilme);

//INSERIR USUARIO
rotas.post("/usuario", adicionarUsuario)

//PUT - EDITAR FILME
rotas.put('/filme/:id', editarFilme)
//DELETE - REmover FILME
rotas.delete("/filme/:id", removerFilme)

// GET = BUSCA OU SELECIONAR DADOS
rotas.get(`/filmes/filtrar/:titulo`, (requisicao, resposta) => {
  // ROTA PARA OBTER DADOS DOS USUARIOS
  return resposta.json(filmes);
});

module.exports = rotas; //EXPORTANDO ROTAS
