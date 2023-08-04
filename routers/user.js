const express = require(`express`)
const router = express.Router()

router.get(`/`, (req, res) => {
  res.statusCode = 201
  const user = { id: 1, mail: "test@mail.ru" }
  res.render('user/user', {
    title: 'User',
    user: user
  })
})

module.exports = router