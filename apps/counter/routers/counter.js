const express = require(`express`)
const router = express.Router()
const redis = require(`redis`)

const REDIS_URL = process.env.REDIS_URL || `redis://localhost`;

const client = redis.createClient({ url: REDIS_URL });
(async () => {
  await client.connect();
})();


router.get(`/:bookId`, async (req, res) => {
  const { bookId } = req.params

  try {
    const cnt = await client.get(bookId);
    res.status(200).json({ bookId: bookId, views: cnt })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Redis error on get` })
  }
})

router.post(`/:bookId/incr`, async (req, res) => {
  const { bookId } = req.params

  try {
    const cnt = await client.incr(bookId);
    res.status(200).json({ bookId: bookId, views: cnt })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Redis error on post` })
  }
})

module.exports = router;
