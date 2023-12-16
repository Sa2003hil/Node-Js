import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
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



app.use(express.urlencoded({ extended: false }));

// we are using ejs for client-side rendering
app.set('view engine', 'ejs');

// set views directory
app.set('views', path.resolve('views'));


// home route
app.get('/', (req, res) => {
    res.render('home');
});

app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;
// listen to port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
