// /index.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const logger = require('./middleware/logger');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up express-ejs-layouts
app.use(expressLayouts);
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Use custom middleware
app.use(logger);

// Use routes
app.use('/', authRoutes);
app.use('/', userRoutes);

// Add a catch-all route at the end
app.get('*', (req, res) => {
  res.redirect('/login');
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});