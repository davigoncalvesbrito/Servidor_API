class Filme {
    constructor(id, titulo, diretor, lancamento, genero, descricao, imagem, ondeAssistir) {
        this.id = id,
            this.titulo = titulo,
            this.diretor = diretor,
            this.lancamento = lancamento,
            this.genero = genero,
            this.descricao = descricao,
            this.imagem = imagem,
            this.ondeAssistir = ondeAssistir
    }
}

module.exports = Filme