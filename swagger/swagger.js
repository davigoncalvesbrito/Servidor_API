const swaggerAutogen = require("swagger-autogen")

const outputFile = "..src/swagger_output.json"
const endPointFile = ["..src/rotas.js"]

swaggerAutogen(outputFile, endPointFile).then(() => {
    require("../src/index.js")
})