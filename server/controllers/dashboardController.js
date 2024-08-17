const db = require('../config/db');

exports.getDashboardData = (req, res) => {
    const userId = req.user.id;

    // Query to get total income
    const incomeQuery = 'SELECT SUM(amount) AS totalIncome FROM income WHERE user_id = ?';
    db.query(incomeQuery, [userId], (err, incomeResult) => {
        if (err) return res.status(500).send('Server error');

        const totalIncome = incomeResult[0].totalIncome || 0;

        // Query to get total expenses
        const expenseQuery = 'SELECT SUM(amount) AS totalExpenses FROM expenses WHERE user_id = ?';
        db.query(expenseQuery, [userId], (err, expenseResult) => {
            if (err) return res.status(500).send('Server error');

            const totalExpenses = expenseResult[0].totalExpenses || 0;
            const netBalance = totalIncome - totalExpenses;

            // Query to get recent transactions
            const transactionQuery = 'SELECT date, category, description, amount FROM transactions WHERE user_id = ? ORDER BY date DESC LIMIT 10';
            db.query(transactionQuery, [userId], (err, transactionResult) => {
                if (err) return res.status(500).send('Server error');

                const transactions = transactionResult;

                res.status(200).json({
                    totalIncome,
                    totalExpenses,
                    netBalance,
                    transactions
                });
            });
        });
    });
};
