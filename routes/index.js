const express = require("express");
const router = express.Router();
const usersRoutes = require("./usersRoutes.js");
const moviesRoutes = require("./moviesRoutes.js");

router.use("/api", usersRoutes);
router.use("/api", moviesRoutes);

module.exports = router;
