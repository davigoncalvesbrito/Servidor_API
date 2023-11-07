const express = require("express");
const rotas = express.Router();
const filmes = require("../src/data/filmes.json");
const { adicionarFilme, editarFilme, listarFilme, removerFilme } = require("../src/controladores/filmesControlador") //Importando controlador Filmes


// JSON FILMES (GET = BUSCAR OU SELECIONAR DADOS)
rotas.get("/filmes", listarFilme);

//POST = INSERIR FILME
rotas.post(`/filme`, adicionarFilme);

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
