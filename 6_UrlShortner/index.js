import express from 'express'
import connectToMongoDB from './connection.js'
import urlRoute from './Routes/url.js'
import URL from './Models/url.js'
import path from 'path'
import staticRoute from './Routes/staticRouter.js'
const app = express()
const port = 8001

// connect to the mongodb
connectToMongoDB('mongodb://127.0.0.1:27017/urlShortner')
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(err => {
    console.log(err)
  })

// set the view engine
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/url', urlRoute) // Here the routes are defined in the Routes folder
app.use('/', staticRoute) //

// // testing the home route
// app.get('/', async (req, res) => {
//   const allUrls = await URL.find({})
//   return res.render('home', {
//     urls: allUrls
//   })
// })

// listen to the port
app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
