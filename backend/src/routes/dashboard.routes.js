const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/kpis", authMiddleware, dashboardController.getKPIs);

module.exports = router;