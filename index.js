const express = require(`express`);
require(`dotenv`).config();

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const errorMiddleware = require('./middleware/error')
const loggerMiddleware = require('./middleware/logger')

const indexRouter = require('./routers/index')
const userApiRouter = require('./routers/api/user')
const bookApiRouter = require('./routers/api/book')
const userRouter = require('./routers/user')
const bookRouter = require(`./routers/book`)

app.set("view engine", "ejs")

app.use(loggerMiddleware)

app.use('/book', bookRouter)
app.use('/user', userRouter)
app.use('/api/book', bookApiRouter)
app.use('/api/user', userApiRouter)
app.use('/', indexRouter)

app.use(errorMiddleware)

app.use((err, req, res, next) => {
  res.status(500).json({
    err: err.toString()
  })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
})