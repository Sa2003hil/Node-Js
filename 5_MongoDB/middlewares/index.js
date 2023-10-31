import fs from 'fs'

function logResRes (filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n ${Date.now()} : ${req.ip} ${req.method}  ${req.url} \n`,
      (err, data) => {
        next()
      }
    )
  }
}

export default logResRes
