const express = require("express");
const cors = require('cors');
const swaggerUi = require("swagger-ui-express")
const swaggerFile = require("./swagger_output.json")
const rotas = require("./rotas"); // REQUERENDO AS ROTAS

const servidor = express();
servidor.use(cors()); // PARA CONSEGUIR UTILIZAR A API 'LOCALHOST' NO CLIENTE

servidor.use(express.json());
servidor.use(rotas); // RECEBENDO AS ROTAS NO SERVIDOR
servidor.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile))


// listen =>  significa 'escutar na porta 3000'
servidor.listen(3000, () => {
  console.log("Servidor Funcionando http://localhost:3000");
});

