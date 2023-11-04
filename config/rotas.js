const express = require("express");
const rotas = express.Router();
const filmes = require("../src/data/filmes.json");
const { adicionarFilme } = require("../src/controladores/filmesControlador") //Importando controlador Filmes


// JSON FILMES (GET = BUSCAR OU SELECIONAR DADOS)
rotas.get("/filmes", (requisicao, resposta) => {
  // ROTA 'FILMES'
  return resposta.json(filmes);
});

// GET = BUSCA OU SELECIONAR DADOS
rotas.get(`/filmes/filtrar/:titulo`, (requisicao, resposta) => {
  // ROTA PARA OBTER DADOS DOS USUARIOS
  return resposta.json(filmes);
});

//POST = INSERIR FILMES
rotas.post(`/filme`, adicionarFilme);

module.exports = rotas; //EXPORTANDO ROTAS
