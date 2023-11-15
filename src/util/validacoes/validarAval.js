const { body } = require("express-validator")

const validarPostAvaliacao = [

    body('idUsuario').notEmpty().withMessage("O campo ID USUARIO é obrigatório"),
    body('idFilme').notEmpty().withMessage("O campo ID FILME é obrigatório"),
    body('comentario').notEmpty().withMessage("O campo comentario é obrigatório"),
    body('comentario').isLength({ min: 8 }).withMessage("Campo comentário precisa ter pelo menos 8 caracteres"),
    body('curtiu').notEmpty().withMessage("O campo curtiu é obrigatório")


]

module.exports = validarPostAvaliacao