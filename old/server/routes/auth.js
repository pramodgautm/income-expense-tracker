const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
//const transaction = require("../controllers/transaction");
const { addTransaction, addExpenses } = require("../controllers/transaction");
const budget = require("../controllers/budget");
const goal = require("../controllers/goal");

const dashboardController = require("../controllers/dashboardController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/addTransaction", addTransaction);
router.post("/addExpenses", addExpenses);

router.get("/dashboard", dashboardController.getDashboardData);

router.post("/addBudget", budget.addBudget);
router.post("/addGoal", goal.addGoal);

module.exports = router;
