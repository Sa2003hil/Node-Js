import express from 'express'
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createNewUser
} from '../controllers/user.js'

// now here we need a router because here we dont have a app object
const router = express.Router()

// GET req ✅ : get all users

// router.get('/', async (req, res) => {
//   const allDBUsers = await User.find({})
//   const html = `
//    <ul>
//    ${allDBUsers
//      .map(user => `<li>${user.firstName}- ${user.email}</li>`)
//      .join('')}
//    </ul>
//     `
//   res.send(html)
// })

// POST req ✅ : create a new user
// router.post('/', async (req, res) => {
//   const body = req.body
//   // check if all the fields are present
//   if (
//     !body.first_Name ||
//     !body.last_Name ||
//     !body.email ||
//     !body.gender ||
//     !body.job_Title
//   ) {
//     return res.status(404).json({ message: 'All fields are required' })
//   }

//   const result = await User.create({
//     firstName: body.first_Name,
//     lastName: body.last_Name,
//     email: body.email,
//     gender: body.gender,
//     jobTitle: body.job_Title
//   })

//   console.log('Result', result)

//   return res.status(201).json({ message: 'User created' })
// })
router.post('/', createNewUser)

// Now Here the concept of controllers comes ✅

// router.get('/', async (req, res) => {
//   const allDBusers = await User.find({})
//   return res.json(allDBusers)
// })
router.get('/', getAllUsers)

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById)
// .get(async (req, res) => {
//   const user = await User.findById(req.params.id)
//   if (!User) return res.status(404).json({ message: 'User not found' })
//   return res.json(user)
// })

// .patch(async (req, res) => {
//   // TODO : Edit the user with id

//   await User.findByIdAndUpdate(req.params.id, { lastName: 'Dhiman' })
//   res.status(201).json({ message: 'User updated' })
// })

// .delete(async (req, res) => {
//   // TODO : delete the user with id
//   await User.findByIdAndDelete(req.params.id)
//   return res.json({ message: 'User deleted' })
// })

export default router
