const express = require(`express`)
require(`dotenv`).config()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const counterRouter = require(`./routers/counter`)

app.use(`/counter`, counterRouter)

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})