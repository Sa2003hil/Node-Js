import express from 'express'
import connectToMongoDB from './connection.js'
import urlRoute from './Routes/url.js'
import URL from './Models/url.js'
const app = express()
const port = 8002

// connect to the mongodb
connectToMongoDB('mongodb://127.0.0.1:27017/urlShortner')
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(err => {
    console.log(err)
  })

// Middleware
app.use(express.json())

// ROUTES
app.use('/url', urlRoute) // Here the routes are defined in the Routes folder

// Redirect to the original url
app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId // get the shortId from the url
  const entry = await URL.findOneAndUpdate(
    // find the entry in the database
    { shortId: shortId },
    {
      $push: {
        // push the timestamp to the visitHistory array because initially it is empty
        visitHistory: {
          timestamp: Date.now()
        }
      }
    }
  )
  return res.redirect(entry.redirectUrl) // redirect to the original url
})

// listen to the port
app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
