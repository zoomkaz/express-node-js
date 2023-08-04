const multer = require(`multer`)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/img`)
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
})

const allowedTypes = [`image/png`, `image/jpg`, `image/jpeg`]

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({ fileFilter, storage })