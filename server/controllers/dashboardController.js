const db = require("../config/db");

exports.getDashboardData = (req, res) => {
  const userId = 1;

  // Query to get total income
  const incomeQuery = `
    SELECT c.category_name, SUM(budget) AS totalbudget, SUM(tran_amount) AS totalexpenses 
    FROM budget_allocated b 
    INNER JOIN transaction_table t ON t.user_id = b.user_id
    INNER JOIN budget_categories c ON c.category_id = b.category_id 
    WHERE b.user_id = ? 
    GROUP BY c.category_name 
  `;

  // Query to get transactions
  const transactionQuery = `
    SELECT category_name, tran_date, tran_amount, tran_desc 
    FROM transaction_table tt
    INNER JOIN budget_categories bc ON bc.category_id = tt.category 
    WHERE tt.user_id = ?
  `;

  const connection = db.startDb();

  connection.all(incomeQuery, [userId], (err, incomeResult) => {
    if (err) {
      db.closeDb();
      return res.status(500).send("Server error");
    }

    connection.all(transactionQuery, [userId], (err, transactionResult) => {
      if (err) {
        db.closeDb();
        return res.status(500).send("Server error");
      }

      db.closeDb();
      res.status(200).json({
        incomeResult,
        transactionResult,
      });
    });
  });
};
