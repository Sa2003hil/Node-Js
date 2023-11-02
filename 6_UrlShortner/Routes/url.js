import express from 'express'
import HandleGenerateNewShortUrl from '../Controller/url.js'
const router = express.Router()

router.post('/', HandleGenerateNewShortUrl)

export default router
