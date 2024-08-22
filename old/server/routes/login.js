const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

router.use(bodyParser.json());

// Mock user data for demonstration purposes
const users = [{ id: 1, email: "user@example.com", password: "password123" }];

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";

router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Find the user from the mock data
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // User found, generate a token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } else {
    // User not found
    res.status(401).json({ message: "Invalid email or password" });
  }
});

module.exports = router;
