import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello from Home')
})

app.get('/about', (req, res) => {
  res.send(`Hello from ${req.query.name} your age is ${req.query.age} `)
})

// so we dont need http module here it is already included in express internally
app.listen(8000, () => {
  console.log('server started')
})
