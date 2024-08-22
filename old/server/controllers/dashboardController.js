const db = require("../config/db");

exports.getDashboardData = (req, res) => {
  const userId = 1;

  // Query to get total income
  let incomeQuery = `
    SELECT c.category_name, SUM(budget) AS totalbudget, SUM(tran_amount) AS totalexpenses 
    FROM budget_allocated b 
    INNER JOIN transaction_table t ON t.user_id = b.user_id
    INNER JOIN budget_categories c ON c.category_id = b.category_id 
    WHERE b.user_id = ? 
    GROUP BY c.category_name 
  `;

  incomeQuery = `
    select bc.category_name, tt.tran_date, tt.tran_amount, tt.tran_desc from transaction_table tt
    inner join budget_categories bc on bc.category_id = tt.category 
    inner join budget_allocated ba on 
    strftime('%Y-%m', tt.tran_date) = ba."month"
    where tt.user_id = ?
    order by ba."month" 
   
  `;

  // Query to get transactions
  let transactionQuery = `
    SELECT category_name, tran_date, tran_amount, tran_desc 
    FROM transaction_table tt
    INNER JOIN budget_categories bc ON bc.category_id = tt.category 
    WHERE tt.user_id = ?
  `;

  transactionQuery = `
    SELECT 
        bc.category_name, 
        ba."month", 
        SUM(ba.budget) AS total_budget
    FROM 
        budget_allocated ba
    INNER JOIN 
        budget_categories bc 
    ON 
        bc.category_id = ba.category_id  
    WHERE 
        ba.user_id = ?
    GROUP BY 
        bc.category_name, 
        ba."month"
    ORDER BY 
        ba."month";

  `;

  let totalQuery = `
    SELECT 
      (SELECT SUM(budget) FROM budget_allocated WHERE user_id = ?) AS total_budget,
      (SELECT SUM(tran_amount) FROM transaction_table WHERE user_id = ?) AS total_transactions;
  `;

  const connection = db.startDb();

  // Execute the income query
  connection.all(incomeQuery, [userId], (err, incomeResult) => {
    if (err) {
      db.closeDb();
      return res.status(500).send("Server error");
    }

    // Execute the transaction query
    connection.all(transactionQuery, [userId], (err, transactionResult) => {
      if (err) {
        db.closeDb();
        return res.status(500).send("Server error");
      }

      // Execute the total query
      connection.all(totalQuery, [userId, userId], (err, totalResult) => {
        db.closeDb();
        if (err) {
          return res.status(500).send("Server error");
        }

        res.status(200).json({
          incomeResult,
          transactionResult,
          totalResult: totalResult[0], // Return the first result from the totalQuery
        });
      });
    });
  });
};
