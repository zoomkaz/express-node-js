const express = require(`express`)
const router = express.Router()
const Book = require('../models/models')

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


router.get('/', (req, res) => {
  const { book } = stor
  res.render("book/index", {
    title: 'Book',
    book: book
  })
})

router.get('/create', (req, res) => {
  res.render("book/create", {
    title: "Book | create",
    book: {},
  });
});

router.post(`/create`, (req, res, next) => {
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
  res.redirect('/book')
})

router.get(`/:id`, (req, res) => {
  const { book } = stor
  const { id } = req.params
  const bookIndex = book.findIndex((elem) => elem.id == id)

  if (bookIndex != -1) {
    res.render("book/view", {
      title: 'Book | View',
      book: book[bookIndex]
    })
  } else {
    res.status(404).redirect('/404')
  }
})

router.get('/update/:id', (req, res) => {
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
    res.render('book/update', {
      title: 'Book | Update',
      book: book
    })
  } else {
    res.status(404).redirect('/404')
  }
})

router.post('/update/:id', (req, res) => {
  const { book } = stor;
  const { id } = req.params;
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

  if (bookIndex !== -1) {
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
    res.redirect(`/book/${id}`);
  } else {
    res.status(404).redirect('/404');
  }
});

router.post(`/delete/:id`, (req, res) => {
  const { book } = stor
  const { id } = req.params
  const bookIndex = book.findIndex(elem => elem.id == id)

  if (bookIndex != -1) {
    book.splice(bookIndex, 1)
    res.statusCode = 201
    res.redirect('/book')
  } else {
    res.statusCode = 404
    res.redirect('/404')
  }
})


module.exports = router