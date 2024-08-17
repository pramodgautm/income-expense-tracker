const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

 const addBudget = (req, res) => {
  const token = "nice";
  const userId = "pramod";
  const { month, budgetCategory, budget, notes } = req.body;

  const query = `
    INSERT INTO Budget 
    (user_id, month, budget_amount, budget_category, notes) 
    VALUES (?, ?, ?, ?, ?)
  `;

  const connection = db.startDb();

  connection.run(
    query,
    [userId, month, budgetCategory, budget, notes],
    function (err) {
      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: "Failed to add Budget" });
      }

      console.log(`Budget added with ID: ${this.lastID}`);
      db.closeDb();

      res.status(200).json({ token });
    }
  );
};

// category hods either food, clothing, expences type.

function viewBudgetStatus(category){

}

export default {
  addBudget,
  viewBudgetStatus,
}
