const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.register = (req, res) => {
  const { email, password } = req.body;
  const username = email;

  const connection = db.startDb();

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send("Server error");
    // Save user to database
    const sql =
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
    connection.run(sql, [username, email, hashedPassword], (err, result) => {
      console.log(err);
      if (err) return res.status(500).send("Server error");
      res.status(201).send("User registered");
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const connection = db.startDb();

  // Find user in database
  const sql = "SELECT * FROM users WHERE email = ?";

  connection.all(
    sql,
    [email], // Corrected the parameter list
    (err, result) => {
      if (err) return res.status(500).send("Server error");
      if (result.length === 0) return res.status(400).send("User not found");

      const user = result[0];

      // Compare passwords
      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err) return res.status(500).send("Server error");
        if (!isMatch) return res.status(400).send("Invalid credentials");

        // Generate JWT
        const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
        db.closeDb();

        res.status(200).json({ token });
      });
    }
  );
};
