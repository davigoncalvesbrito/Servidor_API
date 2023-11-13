class Avalicacao {
    constructor(id, idUsuario, idFilme, comentario, curtiu) {
        this.id = id
        this.idUsuario = idUsuario;
        this.idFilme = idFilme;
        this.comentario = comentario;
        this.curtiu = curtiu;
    }
}

module.exports = Avalicacao;