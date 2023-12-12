import express from 'express';
import path from 'path';
const app = express();

// we are using ejs for client-side rendering
app.set('view engine', 'ejs');

// set views directory
app.set('views', path.resolve('views'));

// home route
app.get('/', (req, res) => {
    res.render('home');
});

const PORT = process.env.PORT || 3000;
// listen to port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
