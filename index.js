const express = require("express");
const cors = require('cors');

const servidor = express();
servidor.use(express.json());
servidor.use(cors()); // PARA CONSEGUIR UTILIZAR A API 'LOCALHOST' NO CLIENTE

const rotas = require("./config/rotas"); // REQUERENDO AS ROTAS
servidor.use(rotas); // RECEBENDO AS ROTAS NO SERVIDOR

// listen =>  significa 'escutar na porta 3000'
servidor.listen(3000, () => {
  console.log("Servidor Funcionando http://localhost:3000");
});
