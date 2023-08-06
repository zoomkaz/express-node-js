const express = require(`express`);
require(`dotenv`).config();
const mongoose = require(`mongoose`)

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
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'books';
const HostDB = process.env.DB_HOST || 'mongodb://localhost:27017/mydb';

async function start() {
  try {
    await mongoose.connect(HostDB, {
      user: UserDB,
      pass: PasswordDB,
      dbName: NameDB,
      useUnifiedTopology: true
    });

    app.listen(PORT, () => {
      console.log(`Server running at port: ${PORT}`);
    })

  } catch (error) {
    console.log(error);
  }
}

start();