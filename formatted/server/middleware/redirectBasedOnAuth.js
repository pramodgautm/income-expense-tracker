// /middleware/redirectBasedOnAuth.js
const redirectBasedOnAuth = (req, res, next) => {
  if (req.path === '/login' || req.path === '/register') {
    if (req.session.user) {
      return res.redirect('/dashboard');
    }
  } else if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

module.exports = redirectBasedOnAuth;