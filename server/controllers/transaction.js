const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const addTransaction = (req, res) => {
  const token = "nice";
  // const userId = "pramod";
  const userId = 1;
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

      res.status(200).json({ 
        "status": true,
        "message": "expenses added successfully",
       });
    }
  );
};



// Function to add expenses
const addExpenses = (req, res) => {
  console.log(req.body);
  // Here we are assuming req.body contains date, category, amount, and description
  const { date, category, amount, description } = req.body;
  const userId = 1; // Assuming userId is available in the req.user object after authentication

  const query = `
    INSERT INTO budget_expenses 
    (user_id, expense_date, category_id, amount, description) 
    VALUES (?, ?, ?, ?, ?)
  `;

  const connection = db.startDb();

  connection.run(
    query,
    [userId, date, category, amount, description],
    function (err) {
      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: "Failed to add expenses" });
      }

      console.log(`Expense added with ID: ${this.lastID}`);
      db.closeDb();

      res.status(200).json({  });
    }
  );
};

module.exports = { addTransaction, addExpenses };
