import users from '../MOCK_DATA.json' assert { type: 'json' }
import fs from 'fs'

const newUser = (req, res) => {
  const body = req.body
  console.log('Body', body) //this gives undefined because do not know that what type of data is this and how to handle this so we need to use middleware
  users.push({ ...body, id: users.length + 1 })
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.json({ status: 'Success', id: users.length })
  })
}

const allUsers = (req, res) => {
  res.json(users)
}

const oneUser = (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id == id)
  res.json(user)
}

const editUser = (req, res) => {
  // TODO : Edit the user with id
  const id = +req.params.id
  const userIndex = users.findIndex(user => user.id === id)
  const user = users[userIndex]
  users.splice(userIndex, 1, { ...user, ...req.body })
  res.status(201).json({ message: 'User updated' })
}

const deleteUser = (req, res) => {
  // TODO : delete the user with id
  const body = req.body
  console.log('Body', body)
  users.pop({ ...body, id: users.length - 1 })
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.json({ message: 'User deleted' })
  })
}

export { newUser, allUsers, oneUser, editUser, deleteUser }
