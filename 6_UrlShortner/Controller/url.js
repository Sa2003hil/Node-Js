import shortid from 'shortid'
import URL from '../Models/url.js'

async function HandleGenerateNewShortUrl (req, res) {
  const body = req.body
  if (!body.url) return res.status(400).json({ message: 'url is required' })
  const shortId = shortid()
  // now we have to insert this to the database so import the model
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: []
  })
  return res.json({ id: shortId })
}

export default HandleGenerateNewShortUrl
