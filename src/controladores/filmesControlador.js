const filmes = require("../data/filmes.json") //Arquivo Json
const Filme = require("../modelos/Filme") //Classe Filme.js
const fs = require("fs/promises")

let idFilme = filmes.length + 2;

function adicionarFilme(req, res) {
    try {
        //Recebe os atributos de usuário vindos do body da requisição
        const { titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir } = req.body; // OBTENDO O CORPO DA SOLICITAÇÃO  JSON

        //validação que ve se o filme já existe
        const filmeEncontrado = filmes.find(filme => filme.titulo === titulo && filme.diretor == diretor);

        if (filmeEncontrado) {
            return res.json({ mensagem: 'Filme já está cadastrado.' })
        }
        //
        const novoFilme = new Filme(idFilme, titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir);
        filmes.push(novoFilme);// Adiciona aos filmes

        fs.writeFile('./src/data/filmes.json', JSON.stringify(filmes));//Escreve no json

        return res.json({ mensagem: 'Filme cadastrado com sucesso.', novoFilme })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Filme não adicionado" })
    }
}

function editarFilme(req, res) {

    const { id } = req.params;
    console.log(id);
    const { titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir } = req.body;

    try {
        //Procura o filme baseado no id informado no params.
        const filmeEncontrado = filmes.find((filme) => filme.id === Number(id)); //Encontra o filme pelo id.
        console.log(filmeEncontrado)

        //Se o filme não é encontrado, retorna mensagem
        if (!filmeEncontrado) {
            return res.status(404).json({ mensagem: 'Não existe filme a ser alterado para o ID informado.' });
        }

        //edita o filme
        filmeEncontrado.titulo = titulo
        filmeEncontrado.diretor = diretor
        filmeEncontrado.lancamento = lancamento
        filmeEncontrado.genero = genero
        filmeEncontrado.descricao = descricao
        filmeEncontrado.imagem = imagem
        filmeEncontrado.ondeAssistir = ondeAssistir

        //escreve no arquivo json e retorna mensagem
        fs.writeFile('./src/data/filmes.json', JSON.stringify(filmes));//Escreve no json
        return res.status(201).json({ mensagem: 'Filme alterado', filmeEncontrado });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Filme não alterado" })
    }
}

function listarFilme(req, res) {

    return res.status(200).json(filmes)
}

function removerFilme(req, res){
    const {id} = req.params;    
    console.log(id)
  
   try {
        //Procura o index do filme conformeo id informado no params.
        const filmesEncontrado = filmes.find(filme => filme.id === Number(id)); 
                
        // Se o Id não for localizado retorna a mensagem abaixo.
        if (!filmesEncontrado) {
            return res.status(404).json({ mensagem: 'Não existe filme para o ID informado.' });
        }
        const filmeIndex = filmes.findIndex(filme => filme.id === Number(id));
        console.log(filmeIndex);       
        filmes.splice(filmeIndex, 1);

        fs.writeFile('./src/data/filmes.json', JSON.stringify(filmes, null, 4));//Escreve no json
        //return res.status(200).json({ mensagem: "Filme excluído com sucesso!"}); 
        return res.json({mensagem: "Filme excluído com sucesso!"})
        
   } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Filme não removido" })
   }
}

module.exports = { adicionarFilme, editarFilme, listarFilme, removerFilme }