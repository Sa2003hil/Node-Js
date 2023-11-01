import express from 'express'

import {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById
} from '../controller/user.js'

const router = express.Router()

router.get('/', getAllUsers)

router.post('/', createNewUser)

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById)

export default router
