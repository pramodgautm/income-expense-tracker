// /controllers/authController.js
const users = {}; // In-memory user store

const renderLogin = (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  const error = req.query.error;
  res.render('login', { 
    title: 'Login',
    layout: 'layouts/auth',
    error: error,
    registered: req.query.registered === '1'
  });
};

const handleLogin = (req, res) => {
  const { username, password } = req.body;
  
  if (username === "admin" && password === "admin") {
    req.session.user = username;
    res.redirect('/dashboard');
  } else {
    res.redirect('/login?error=1');
  }
};

const handleLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out');
    }
    res.redirect('/login');
  });
};

const renderRegister = (req, res) => {
  res.render('register', {
    title: 'Register',
    layout: 'layouts/auth'
  });
};

const handleRegister = (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.render('register', {
      title: 'Register',
      layout: 'layouts/auth',
      error: 'User already exists'
    });
  }
  
  users[username] = password;
  res.redirect('/login?registered=1');
};

module.exports = {
  renderLogin,
  handleLogin,
  handleLogout,
  renderRegister,
  handleRegister,
};