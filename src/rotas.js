const express = require("express");
const rotas = express.Router();
const filmes = require("./data/filmes.json");
const { adicionarFilme, editarFilme, listarFilme, removerFilme } = require("./controladores/filmesControlador")
const { adicionarUsuario, listarUsuarios, editarUsuario } = require("./controladores/UsuariosControlador") //Importando controlador Filmes
const { body, validationResult } = require("express-validator")


/* ----------ROTAS GET --------->  */
rotas.get("/filmes", listarFilme);
rotas.get("/usuarios", listarUsuarios)

/* ----------ROTAS POST --------->  */
//Inserir filme
rotas.post(`/filme`,
  [
    body('titulo').notEmpty().withMessage("O campo título é obrigatório"),
    body('diretor').notEmpty().withMessage("O campo diretor é obrigatório"),
    body('lancamento').notEmpty().withMessage("O campo lançamento é obrigatório"),
    body('genero').notEmpty().withMessage("O campo gênero é obrigatório"),
    body('descricao').notEmpty().withMessage("O campo descrição é obrigatório"),
    body('imagem').notEmpty().withMessage("O campo imagem é obrigatório"),

  ], adicionarFilme);

//Inserir Usuário
rotas.post("/usuario", [
  body('nome').notEmpty().withMessage("O campo nome é obrigatório"),
  body('email').notEmpty().withMessage("O campo email é obrigatório"),
  body('senha').notEmpty().withMessage("O campo senha é obrigatório"),
], adicionarUsuario)

/* ----------ROTAS PUT --------->  */
//Editar Filme
rotas.put('/filme/:id', editarFilme)
rotas.put('/usuario/:id', editarUsuario)

/* ----------ROTAS Delete --------->  */
//Remover filme
rotas.delete("/filme/:id", removerFilme)


module.exports = rotas; //EXPORTANDO ROTAS
