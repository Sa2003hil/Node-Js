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

    const user = User.matchPassword(email, password);

    console.log("User:", user);

    return res.redirect('/');

})


export default router;
