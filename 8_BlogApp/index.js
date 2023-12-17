import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { checkForAuthCookie } from './middleware/authentication.js';
const app = express();

import userRouter from './routes/user.js';

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/blogify', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected!!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });


// we are using ejs for client-side rendering
app.set('view engine', 'ejs');

// set views directory
app.set('views', path.resolve('views'));


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static('public'));

// home route
app.get('/', (req, res) => {
    res.render('home', {
        user: req.user,
    });
});


app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;
// listen to port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

