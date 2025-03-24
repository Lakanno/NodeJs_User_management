require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
// const { flash } = require('express-flash-message');
const methodOverride = require('method-override');
const flash = require('connect-flash');

const session = require('express-session');
const connectDB = require('./server/config/db');


const app = express();
const port = process.env.PORT || 5000;

// Connect database
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
// Static files 
app.use(express.static('public'));

// Express session
app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);
// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));




// Template engine 
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/customer'));

// handle 404 error
app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});