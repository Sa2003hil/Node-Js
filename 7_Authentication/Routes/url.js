import express from 'express'
import {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleRedirectUrl
} from '../Controller/url.js'
const router = express.Router()

router.post('/', handleGenerateNewShortUrl)

router.get('/:shortId', handleRedirectUrl)

router.get('/analytics/:shortId', handleGetAnalytics)

export default router
