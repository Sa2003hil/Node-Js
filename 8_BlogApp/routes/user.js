import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        await User.create({
            fullName,
            email,
            password
        });

        return res.redirect('/user/signin');
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send('Internal Server Error');
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGenrateToken(email, password);
        return res.cookie('token', token).redirect('/');

    } catch (error) {
        return res.render('signin', {
            error: "Invalid email or password"
        });
    }


    // console.log("Token:", token);
    // here we have to return the token in the cookie


})

router.get('/signout', (req, res) => {
    res.clearCookie('token').redirect('/');
});


export default router;
