import { getUser } from '../service/auth.js'

export async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies.uid
    // agar user ki uid nahi hai toh usko login page pe bhej do
    if (!userUid) {
        return res.redirect('/login')
    }
    // agar user ki uid hai toh check karo ki kya user hai ya nahi
    const user = getUser(userUid)

    if (!user) {
        return res.redirect('/login')
    }

    req.user = user;
    next()
}