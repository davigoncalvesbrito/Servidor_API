const { body } = require("express-validator")

const validarPostUsuario = [

    body('nome').notEmpty().withMessage("O campo nome é obrigatório"),
    body('email').notEmpty().withMessage("O campo email é obrigatório"),
    body('senha').notEmpty().withMessage("O campo senha é obrigatório")
]

const validarEditarUsuario = [

]

const validarRemoverUsuario = [

]

module.exports = validarPostUsuario 