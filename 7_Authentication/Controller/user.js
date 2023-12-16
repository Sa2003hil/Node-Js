import User from '../Models/user.js'
import { v4 as uuidv4 } from 'uuid'
import { setUser } from '../service/auth.js'

export async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body //destructuring
  await User.create({
    name,
    email,
    password
  })

  return res.redirect('/login')
}

export async function handleUserLogin(req, res) {
  const { email, password } = req.body
  const user = await User.findOne({ email, password })

  if (!user) {
    return res.status(302).render("login", {
      error: "Invalid Username or Password",
    })
  }

  const sessionId = uuidv4(); // now make a service folder in which we will create a file auth.js
  setUser(sessionId, user);
  res.cookie('uid', sessionId);
  return res.redirect('/');
}
