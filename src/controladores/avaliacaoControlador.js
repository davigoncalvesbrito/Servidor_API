const jsonAvaliacoes = require("../data/avaliacao.json");
const avaliacaoModel = require("../modelos/Avaliacao");
const fs = require("fs/promises")

const idAvaliacao = jsonAvaliacoes.length + 1

function adicionarAvaliacao(req, res) {
    try {
        const { idUsuario, idFilme, comentario, curtiu } = req.body

        //Verifica se já existe uma avaliação do usuário para o filme.
        const avaliacaoEncontrada = jsonAvaliacoes.find((avaliacao1 => avaliacao1.idUsuario === Number(idUsuario) && avaliacao1.idFilme === Number(idFilme)))

        const novaAvaliacao = new avaliacaoModel(idAvaliacao, idUsuario, idFilme, comentario, curtiu);
        jsonAvaliacoes.push(novaAvaliacao);

        fs.writeFile("./src/data/avaliacao.json", JSON.stringify(jsonAvaliacoes, null, 4))//escreve no json

        return res.status(201).json({ mensagem: "Avaliacao cadastrada com sucesso!" })

    } catch (error) {
        res.status(500).json({ mensagem: "Erro do servidor, Avaliação não cadastrada." })
    }
}

function editarAvaliacao(req, res) {

    const { idAvaliacao } = req.body;

    try {
        //Procura a avaliacao baseado no id informado no params.
        const avaliacaoEncontrada = jsonAvaliacoes.find((avaliacao) => avaliacao.id === Number(idAvaliacao)); //Encontra a avaliacao pelo id.

        //Se a avaliacao não é encontrada, retorna mensagem
        if (!avaliacaoEncontrada) {
            return res.status(404).json({ mensagem: 'Não existe avaliacao a ser alterada para o ID informado.' });
        }

        //edita a avaliacao
        avaliacaoEncontrada.comentario = comentario;
        avaliacaoEncontrada.curtiu = curtiu;

        //escreve no arquivo json e retorna mensagem
        fs.writeFile('./src/data/avaliacao.json', JSON.stringify(jsonAvaliacoes, null, 4));//Escreve no json
        return res.status(201).json({ mensagem: 'Avaliação Alterada', avaliacaoEncontrada });

    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro do servidor. Avaliacao não alterada"
        })
    }

}

function listarAvaliacao(req, res) { //lista todos as avaliacoes, e também lista avaliacoes por filme e por usuario
    const { idUsuario, idFilme } = req.query;
    //pode montar localhost:3000/avaliacao?idUsuario=4
    //pode montar localhost:3000/avaliacao?idFilme=4

    if (idUsuario) {
        const avaliacoesEncontradas = jsonAvaliacoes.filter(avaliacao => avaliacao.idUsuario === Number(idUsuario))
        return res.status(200).json(avaliacoesEncontradas)
    }

    if (idFilme) {
        const avaliacoesEncontradas = jsonAvaliacoes.filter(avaliacao => avaliacao.idFilme === Number(idFilme))
        return res.status(200).json(avaliacoesEncontradas)
    }

    return res.status(200).json(jsonAvaliacoes)
}

function removerAvaliacao(req, res) {
    const { id } = req.params;

    try {
        //Procura o index da avaliacao conformeo id informado no params.
        const avaliacaoEncontrado = jsonAvaliacoes.find(avaliacao => avaliacao.id === Number(id));

        // Se o filme não for localizado retorna a mensagem abaixo.
        if (!avaliacaoEncontrado) {
            return res.status(404).json({ mensagem: 'Não existe avaliacao com o id informado' });
        }

        //Já que o filme existe, exclui através do id usando o splice
        const avaliacaoIndex = jsonAvaliacoes.findIndex(avaliacao => avaliacao.id === Number(id));
        jsonAvaliacoes.splice(avaliacaoIndex, 1);

        fs.writeFile('./src/data/avaliacao.json', JSON.stringify(jsonAvaliacoes, null, 4));//Escreve no json

        return res.status(200).json({ mensagem: "Avaliacao excluída com sucesso!" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Avaliaçao não removida" })
    }
}


module.exports = { adicionarAvaliacao, editarAvaliacao, listarAvaliacao, removerAvaliacao }