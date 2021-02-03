const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

// res.render looks in the 'views' folder by default for ejs files (the view-engine set in app.js)
// Welcome page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  // req.user is populated by passport
  res.render('dashboard', {
    name: req.user.name,
  })
);

module.exports = router;
