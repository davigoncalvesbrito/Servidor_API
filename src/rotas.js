const express = require("express");
const rotas = express.Router();
const fs = require('fs');
const filmes = require("./data/filmes.json");
const { adicionarFilme, editarFilme, listarFilme, removerFilme } = require("./controladores/filmeControlador")
const { adicionarUsuario, listarUsuarios, editarUsuario, deletarUsuario } = require("./controladores/usuarioControlador") //Importando controlador Filmes
const { adicionarAvaliacao, editarAvaliacao, listarAvaliacao, removerAvaliacao } = require("./controladores/avaliacaoControlador");
const { body, validationResult } = require("express-validator");





/* ----------ROTAS GET --------->  */
rotas.get("/filmes", listarFilme)
rotas.get("/usuarios", listarUsuarios)
rotas.get("/avaliacao", listarAvaliacao)
//pode montar localhost:3000/avaliacao?idUsuario=4
//pode montar localhost:3000/avaliacao?idFilme=4

/* ----------ROTAS POST --------->  */
//Inserir Filme / Usuario / Avaliacao
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

rotas.post("/avaliacao", adicionarAvaliacao)

/* ----------ROTAS PUT --------->  */
//Editar Filme / Usuario
rotas.put('/filme/:id', editarFilme)
rotas.put('/usuario/:id', editarUsuario)
rotas.put("/avaliacao", editarAvaliacao)


/* ----------ROTAS Delete --------->  */
//Remover filme / Usuario
rotas.delete("/filme/:id", removerFilme)
rotas.delete("/usuario/:id", deletarUsuario)
rotas.delete("/avaliacao/:id", removerAvaliacao)

// DAVI
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

module.exports = rotas; //EXPORTANDO ROTAS
