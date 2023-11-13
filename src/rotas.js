const express = require("express");
const rotas = express.Router();
const fs = require('fs');
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


  // Rotas de validação do login //DAVI
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
