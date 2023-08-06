const express = require(`express`)
const router = express.Router()
const Book = require('../models/book')


router.get('/', async (req, res) => {
  const book = await Book.find()
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

router.post(`/create`, async (req, res, next) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  } = req.body

  const newBook = new Book({ title, description, authors, favorite, fileCover, fileName })

  try {
    await newBook.save()
    res.status(201).redirect(`/book`)
  } catch (error) {
    console.error(error);
    res.status(500)
  }
})

router.get(`/:id`, async (req, res) => {
  const { id } = req.params

  try {
    const book = await Book.findById(id)
    res.status(200);
    res.render("book/view", {
      title: 'Book | View',
      book: book
    })
  } catch (error) {
    console.error(error);
    res.status(404).redirect('/404')
  }
})

router.get('/update/:id', async (req, res) => {
  const { id } = req.params

  try {
    const book = await Book.findById(id)
    res.status(200);
    res.render("book/update", {
      title: 'Book | View',
      book: book
    })
  } catch (error) {
    console.error(error);
    res.status(404).redirect('/404')
  }
})

router.post('/update/:id', async (req, res) => {
  const { id } = req.params
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  } = req.body

  try {
    const book = await Book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName })
    res.status(201);
    res.render('book/update', {
      title: 'Book | Update',
      book: book
    })
  } catch (error) {
    console.error(error);
    res.status(404).redirect(`/404`)
  }
});

router.post(`/delete/:id`, async (req, res) => {
  const { id } = req.params

  try {
    await Book.deleteOne({ _id: id })
    res.status(201).redirect(`/book`)
  } catch (error) {
    console.error(error);
    res.status(404).redirect(`/404`)
  }
})


module.exports = router