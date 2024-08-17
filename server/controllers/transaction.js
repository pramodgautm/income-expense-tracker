const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.addTransaction = (req, res) => {
  const token = "nice";
  const userId = "pramod";
  const { date, amount, category, description } = req.body;

  const query = `
    INSERT INTO transaction_table 
    (user_id, tran_date, category, tran_desc, tran_amount) 
    VALUES (?, ?, ?, ?, ?)
  `;

  const connection = db.startDb();

  connection.run(
    query,
    [userId, date, category, description, amount],
    function (err) {
      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: "Failed to add transaction" });
      }

      console.log(`Transaction added with ID: ${this.lastID}`);
      db.closeDb();

      res.status(200).json({ token });
    }
  );
};
