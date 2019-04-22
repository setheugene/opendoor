
const router = require("express").Router();
const allRoutes = require("./api");

// Book routes
router.use("/all", allRoutes);

module.exports = router;