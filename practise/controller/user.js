import User from '../models/user.js'

// Get all users
export async function getAllUsers (req, res) {
  const allDBusers = await User.find({})
  return res.json(allDBusers)
}

// Get user by ID
export async function getUserById (req, res) {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  return res.json(user)
}

// Update user by ID
export async function updateUserById (req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: 'Dhiman' })
  res.status(201).json({ message: 'User updated' })
}

// Delete user by ID
export async function deleteUserById (req, res) {
  await User.findByIdAndDelete(req.params.id)
  return res.json({ message: 'User deleted' })
}

// create a new user
export async function createNewUser (req, res) {
  const body = req.body

  if (
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(404).json({ message: 'All fields are required' })
  }

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle
  })
  console.log('Result', result)

  return res.status(201).json({ message: 'User created', id: result._id })
}
