import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
  return res.render('home')
})

export default router
