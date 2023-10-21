// app.mjs
import express from 'express'
import users from './MOCK_DATA.json' assert { type: 'json' }
const app = express()
const PORT = 8001

// ROUTES

/*

creating a route for getting all users✅

Important NOTE:
Server is basically a hybrid server , means humara server aisa hona chahiye ki vo
browser ko bhi support kare and another mobile apps ko bhi support kare.

'/users' --> returning JSON

means any user do GET req on 

'/users' ---> render HTML document
'/api/users' ---> return JSON (mobile apps)

Basically we are making an Hybrid server which can support both browser and mobile apps.this is a good practice to do.

*/
app.get('/api/users', (req, res) => {
  return res.json(users)
})

// if a user do GET req on '/users' then we will render HTML document✅

app.get('/users', (req, res) => {
  const html = `
  <ul>${users.map(user => `<li>${user.last_name}</li>`).join('')}</ul>
  `
  res.send(html)
})

// Dynamic Path Routing ✅

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  const user = users.find(user => user.id == id)
  res.json(user)
})

// listening to the server
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`)
})
