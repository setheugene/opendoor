const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes

router.use("/api", apiRoutes);


// ------------------FOR JAKE TESTING FOLDER-------------------
// router.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, "../testing/test.html"));
// })
// ------------------END JAKE TESTING FOLDER-------------------



// If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../my-app/public/index.html"));
// });


module.exports = router;