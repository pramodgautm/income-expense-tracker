const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const transaction = require("../controllers/transaction");
const budget = require("../controllers/budget");
const goal = require("../controllers/goal");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/addTransaction", transaction.addTransaction);
router.post("/addBudget", budget.addBudget);
router.post("/addGoal", goal.addGoal);

module.exports = router;
