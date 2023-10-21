// importing http module
import http from 'http'
import fs from 'fs'
import url from 'url'

// creating server and create a log file when the server is started
const myServer = http.createServer((req, res) => {
  if (req.url == '/favicon.ico') {
    return res.end()
  }
  const log = `${Date.now()} : ${req.url} New Request Received\n`
  const myUrl = url.parse(req.url, true)
  console.log(myUrl)
  fs.appendFile('log.txt', log, (err, data) => {
    switch (myUrl.pathname) {
      case '/':
        res.end('Home Page')
        break
      case '/about':
        const username = myUrl.query.myname
        res.end(`HI , ${username}`)
        break
      case '/contact':
        res.end('Contact Page')
        break
      default:
        res.writeHead(404, {
          'Content-type': 'text/html'
        })
        res.end('404 Not Found')
    }
  })
})

// listening to the server
myServer.listen(8000, () => {
  console.log('server started')
})
