import express from 'express'

import connectToMongoDB from './connection.js'
import URL from './Models/url.js'
import path from 'path'
import cookieParser from 'cookie-parser'
import { restrictToLoggedInUserOnly } from './middlewares/auth.js'

const app = express()
const port = 8001

// Importing Routes
import urlRoute from './Routes/url.js'
import staticRoute from './Routes/staticRouter.js'
import userRoute from './Routes/user.js'

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
app.use(cookieParser())

// ROUTES
app.use('/', staticRoute)
app.use('/url', restrictToLoggedInUserOnly, urlRoute) // agar tumhe is route pe kaam karna hai then tumhe logged in hona padega so we put a middleware here 
app.use('/user', userRoute)

// listen to the port
app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
