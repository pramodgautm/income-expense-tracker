const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.addGoal = (req, res) => {
  const token = "nice";
  const userId = "pramod";
  const { goalName, goalAmount, goalDate, goalCategory, goalNotes } = req.body;

  const query = `
    INSERT INTO goals 
    (user_id, goal_name, goal_amount, target_date, category,notes) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const connection = db.startDb();

  connection.run(
    query,
    [userId, goalName, goalAmount, goalDate, goalCategory, goalNotes],
    function (err) {
      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: "Failed to add Goal" });
      }

      console.log(`Goal added with ID: ${this.lastID}`);
      db.closeDb();

      res.status(200).json({ token });
    }
  );
};
