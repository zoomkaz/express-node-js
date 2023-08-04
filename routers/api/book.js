const express = require(`express`)
const router = express.Router()
const Book = require('../../models/models')
const fileMiddleware = require(`../../middleware/file`)

const stor = {
  book: []
};

[1, 2, 3].map(elem => {
  const newBook = new Book(
    `title ${elem}`,
    `description ${elem}`,
    `authors ${elem}`,
    `favorite ${elem}`,
    `fileCover ${elem}`,
    `fileName ${elem}`,
    `fileBook ${elem}`
  );
  stor.book.push(newBook)
})

router.get(`/err`, (req, res) => {
  throw new Error(`error message`)
})

router.get('/', (req, res) => {
  const { book } = stor
  res.json(book)
})

router.get(`/:id`, (req, res) => {
  const { book } = stor
  const { id } = req.params
  const bookIndex = book.findIndex((elem) => elem.id == id)

  if (bookIndex != -1) {
    res.json(book[bookIndex])
  } else {
    res.statusCode = 404
    res.json("Книга не найдена")
  }
})

router.post(`/`, fileMiddleware.any(), (req, res, next) => {
  const { book } = stor
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  } = req.body

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
  book.push(newBook)

  res.statusCode = 201
  res.json(newBook)
})

router.put('/:id', fileMiddleware.any(), (req, res) => {
  const { book } = stor
  const { id } = req.params
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  } = req.body
  const bookIndex = book.findIndex((elem) => elem.id == id)

  if (bookIndex != -1) {
    book[bookIndex] = {
      ...book[bookIndex],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    }
    res.statusCode = 201
    res.json(book[bookIndex])
  } else {
    res.statusCode = 404
    res.json("Книга не найдена")
  }
})

router.delete(`/:id`, (req, res) => {
  const { book } = stor
  const { id } = req.params
  const bookIndex = book.findIndex(elem => elem.id == id)

  if (bookIndex != -1) {
    book.splice(bookIndex, 1)
    res.statusCode = 201
    res.json('ok')
  } else {
    res.statusCode = 404
    res.json('Книга не найдена')
  }
})

router.post(`/upload-img`, fileMiddleware.single('cover-img'), (req, res) => {
  if (req.file) {
    const { path } = req.file
    console.log(path);
    res.json(path)
  } else {
    res.json(null)
  }
})

router.get(`/:id/download-img`, (req, res) => {
  res.download(__dirname + `/../public/img/me.jpg`, `author.jpg`, (err) => {
    if (err) res.status(404).json()
  })
})


module.exports = router