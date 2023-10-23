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

/*

Old way of doing this

// GET req ✅
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id == id)
  res.json(user)
})

// Here we can see that there is a repetition of code in '/api/users/:id' format so we can use app.route() method to remove this repetition of code

// PATCH req ✅
app.patch('/api/users/:id', (req, res) => {
  // TODO : Edit the user
  return res.json({ message: 'User created' })
})

// DELETE req ✅
app.delete('/api/users/:id', (req, res) => {
  // TODO : delete the user
  return res.json({ message: 'User created' })
})


*/

// Dynamic Path Routing Optimised way ✅

app
  .route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id == id)
    res.json(user)
  })
  .patch((req, res) => {
    // TODO : Edit the user with id
    return res.json({ message: 'User created' })
  })
  .delete((req, res) => {
    // TODO : delete the user with id
    return res.json({ message: 'User created' })
  })

// POST req ✅
app.post('/api/users', (req, res) => {
  // TODO : create a new user
  return res.json({ message: 'User created' })
})

// listening to the server
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`)
})
