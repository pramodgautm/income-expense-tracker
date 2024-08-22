// /controllers/userController.js
const renderDashboard = (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { 
      title: 'Dashboard',
      username: req.session.user,
      layout: 'layouts/main'
    });
  } else {
    res.redirect('/login');
  }
};

const renderDashboard2 = (req, res) => {
  if (req.session.user) {
    res.render('dashboard2', { 
      title: 'Dashboard 2',
      username: req.session.user,
      layout: 'layouts/main'
    });
  } else {
    res.redirect('/login');
  }
};

const renderIncome = (req, res) => {
  if (req.session.user) {
    res.render('income', { 
      title: 'Income',
      username: req.session.user,
      layout: 'layouts/main'
    });
  } else {
    res.redirect('/login');
  }
};

module.exports = {
  renderDashboard,
  renderDashboard2,
  renderIncome
};