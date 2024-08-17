const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");


// Add a budget to the database
exports.addBudget = (req, res) => {
  const userId = 1; // This should be dynamically set, e.g., from req.user or req.session
  const categoryId = req.body.category;
  const month = req.body.month;
  const budget = req.body.amount;

  const query = `
    INSERT INTO budget_allocated 
    (user_id, category_id, month, budget) 
    VALUES (?, ?, ?, ?)
  `;

  const connection = db.startDb();

  connection.run(
    query,
    [userId, categoryId, month, budget], // Corrected the parameter list
    function (err) {
      db.closeDb(); // Ensure this is called regardless of success or error

      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: "Failed to add budget" });
      }

      console.log(`Budget added with ID: ${this.lastID}`);
      res.status(200).json({
        status: true,
        message: "Budget allocated successfully",
      });
    }
  );
};


// Function to view budget status by category
exports.viewBudgetStatus = (req, res) => {
  const userId = 1; // This should be dynamically set
  const category = req.params.category;

  const query = `
    SELECT * FROM budget_allocated
    WHERE user_id = ? AND category_id = ?
  `;

  const connection = db.startDb();

  connection.all(
    query,
    [userId, category],
    (err, rows) => {
      db.closeDb(); // Ensure this is called regardless of success or error

      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: "Failed to retrieve budget status" });
      }

      res.status(200).json({
        status: true,
        data: rows
      });
    }
  );
};

// module.exports = {
//   addBudget,
//   viewBudgetStatus
// };