module.exports = {
  ensureAuthenticated: function (req, res, next) {
    // isAuthenticated property comes from passport
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/users/login');
  },
};
