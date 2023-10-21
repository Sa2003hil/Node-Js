// imporing http module
import http from 'http'
import fs from 'fs'

/*
-> creating server

const myServer = http.createServer((req, res) => {
  console.log('server started')
  console.log(req.headers) // to get headers
  res.end('Hello from the server')
})
*/

// creating server and create log file when server started
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${req.url} New Request Received\n`
  fs.appendFile('log.txt', log, (err, data) => {
    switch (req.url) {
      case '/':
        res.end('Home Page')
        break
      case '/about':
        res.end('About Page')
        break
      case '/contact':
        res.end('Contact Page')
        break
      default:
        res.writeHead(404, {
          'Content-type': 'text/html'
        })
    }
    res.end('Hello from the server')
  })
})

// listening to server
myServer.listen(8000, () => {
  console.log('server started')
})
