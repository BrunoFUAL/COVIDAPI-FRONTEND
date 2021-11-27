const express = require("express")

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true}))

require("./rotas/rotas")(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`O servidor está a ouvir na porta ${PORT}`)
})

app.use(express.static('public'))