const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
// To display a message after a redirect, flash stores message as session.
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// MIDDLEWARE SETUP (app.use())
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser (so we can get form data from req.body)
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware (must go after express session)
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars (e.g. res.locals.success_msg will be available in ejs template as success_msg)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
