// /routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  renderDashboard,
  renderDashboard2,
  renderIncome,
} = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuth");

router.get("/dashboard", checkAuth, renderDashboard);
router.get("/dashboard2", checkAuth, renderDashboard2);
router.get("/income", checkAuth, renderIncome);

module.exports = router;
