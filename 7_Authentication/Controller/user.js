import User from '../Models/user.js'

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
  console.log("user: ", user)
  if (!user) {
    res.render("login", {
      error: "Invalid Username or Password",
    })
  }
  return res.redirect('/')
}
