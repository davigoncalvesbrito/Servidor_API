const express = require("express");
const rotas = express.Router();
const filmes = require("../src/data/filmes.json");


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
rotas.post(`/adicionar`, (requisicao, resposta) => {
  // ROTA PARA  ADICIONAR 'USUARIOS' AO ARRAY

  const corpo = requisicao.body; // OBTENDO O CORPO DA SOLICITAÇÃO  JSON
  filmes.push(corpo); // ADICIONANDO UM NOVO DADO AO ARRAY

  return resposta.json(filmes); // RESPOSTA COM ARRAY ATUALIZADO EM  JSON
});

module.exports = rotas; //EXPORTANDO ROTAS
