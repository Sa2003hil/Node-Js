import shortid from 'shortid'
import URL from '../Models/url.js'

export async function handleGenerateNewShortUrl(req, res) {
  const body = req.body
  if (!body.url) return res.status(400).json({ message: 'url is required' })
  const shortId = shortid()
  // now we have to insert this to the database so import the model
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBY: req.user._id
  })

  return res.render('home', { id: shortId })
  // return res.json({ id: shortId })
}

// handling the redirect url when the shortId is provided syntax : http://localhost:8001/url/:shortId
export async function handleRedirectUrl(req, res) {
  const shortId = req.params.shortId
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now()
        }
      }
    }
  )
  res.redirect(entry.redirectUrl)
}

export async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId
  const result = await URL.findOne({ shortId })
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory
  })
}

// export default { handleGetAnalytics, handleGenerateNewShortUrl }
