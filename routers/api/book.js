const express = require(`express`)
const router = express.Router()
const Book = require(`../../models/book`)
const fileMiddleware = require(`../../middleware/file`)

router.get('/', async (req, res) => {
  const book = await Book.find()
  res.json(book)
})

router.get(`/:id`, async (req, res) => {
  const { id } = req.params

  try {
    const book = await Book.findById(id)
    res.status(200).json(book)
  } catch (error) {
    console.error(error)
    res.status(404).redirect(`/404`)
  }
})

router.post(`/`, fileMiddleware.any(), async (req, res, next) => {
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
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500)
    console.error(error);
  }
})

router.put('/:id', fileMiddleware.any(), async (req, res) => {
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
    await Book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName })
    res.status(201).redirect(`/book/${id}`)
  } catch (error) {
    console.error(error);
    res.status(404).redirect(`/404`)
  }
})

router.delete(`/:id`, async (req, res) => {
  const { id } = req.params

  try {
    await Book.deleteOne({ _id: id })
    res.status(201).json('ok')
  } catch (error) {
    console.error(error);
    res.status(404).redirect(`/404`)
  }
})

router.post(`/upload-img`, fileMiddleware.single('cover-img'), (req, res) => {
  if (req.file) {
    const { path } = req.file
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