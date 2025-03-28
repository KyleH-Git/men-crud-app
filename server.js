// ***** Modules *****
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

// ***** Middleware *****
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

// ***** DB Connection *****
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MonogoDB ${mongoose.connection.name}`);
});


app.get('/', (req, res) => {
    res.send('Server working!');
});



app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});
