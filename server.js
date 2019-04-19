const express = require("express");
const sequelize = require("sequelize");
const routes = require("./routes");
const app = express();

// firebase service sdk
const admin = require("firebase-admin")
const serviceAccount = require("./config/opendoor-admin.json");

const db = require("./models");
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("testing"));


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

var syncOptions = { force: true };

// firebase admin sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://opendoor-9b5d6.firebaseio.com"
});

// checking for admin privileges from login
app.post("/login", function (req, res) {
  let idToken = req.body.token;
  // authenticating the token via firebase admin SDK
  admin.auth().verifyIdToken(idToken)
    .then(function (decodedToken) {
      // grabbing the uid from the decoded token
      let uid = decodedToken.uid
      console.log("UID RESOLVED: " + uid);
      admin.auth().getUser(uid)
        .then(function (records) {
          console.log('Fetched user data: ', records.toJSON());
          let userInfo = records.toJSON();
          // actual check for admin custom claims,  if so we return true
          if (userInfo.email === "admin@admin.com" && userInfo.customClaims && userInfo.customClaims.admin === true) {
            return true;
            // if the email is our administrator email and there's no custom claim, we add the admin claim and return true
          } else if (userInfo.email === "admin@admin.com") {
            admin.auth().setCustomUserClaims(userInfo.uid, { admin: true })
              .then(() => {
                return true;
              })
            // if there's no admin email and no custom admin claim, return false
          } else {
            return false;
          }
        })
        .catch((err) => {
          throw err
        })
    })
})

app.use(routes);

db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
