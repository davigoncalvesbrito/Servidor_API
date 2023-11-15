const { body } = require("express-validator")

const validarPostFilme = [

    body('titulo').notEmpty().withMessage("O campo título é obrigatório"),
    body('diretor').notEmpty().withMessage("O campo diretor é obrigatório"),
    body('lancamento').notEmpty().withMessage("O campo lançamento é obrigatório"),
    body('lancamento').isNumeric().withMessage("O campo lançamento é numérico"),
    body('genero').notEmpty().withMessage("O campo gênero é obrigatório"),
    body('descricao').notEmpty().withMessage("O campo descrição é obrigatório"),
    body('imagem').notEmpty().withMessage("O campo imagem é obrigatório"),

]



module.exports = validarPostFilme