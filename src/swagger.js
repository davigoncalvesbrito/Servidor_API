const swaggerAutogen = require("swagger-autogen")

const outputFile = "./swagger_output.json"
const endPointFile = ["./rotas.js"]

swaggerAutogen(outputFile, endPointFile).then(() => {
    require("./index.js")
})