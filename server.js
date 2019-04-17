const express = require("express");
const sequelize = require("sequelize");
// const routes = require("./routes");
const app = express();
// firebase service sdk
const admin = require("firebase-admin")
const serviceAccount = require("./config/opendoor-admin.json");
const db = require("./models");
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

var syncOptions = { force: true };


// firebase admin sdk init
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://opendoor-9b5d6.firebaseio.com"
});



// app.use(routes);






db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
  