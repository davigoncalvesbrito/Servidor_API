//Aqui ele recebe os erros da requisição e não chega a adicionar nada caso tenha algum.
const { validationResult } = require("express-validator")

function requisicaoValidada(req, res, next) {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ mensagem: errors.errors[0].msg });
    }
    next();
}

module.exports = requisicaoValidada