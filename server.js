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


// function to check for admin claims on firebase, returns true if so
let verifyAdmin = (data) => {
  // check if claims exist on this user already
  if (data.email === "admin@admin.com" && data.customClaims && data.customClaims.admin === true) {
    console.log("admin logged in");
    return true;
    // if the email is our administrator email and there's no custom claim, we add the admin claim and return true
  } else if (data.email === "admin@admin.com") {
    admin.auth().setCustomUserClaims(data.uid, { admin: true })
      .then(() => {
        console.log("admin privileges added, admin logged in");
        return true;
      })
    // if there's no admin email and no custom admin claim, return false
  } else {
    console.log(data.email + " has logged in");
    return false;
  }
}

// finds our user in database to see if they exist, if not we add them
// this function ONLY ever gets called after we create an account in firebase
// or when a user is logging into the system
let verifyInDatabase = async (data, admin, res) => {
  await db.User
    .findOne({
      where: {
        username: data.email,
        admin_status: admin
      }
    })
    .then((found) => {
      // if we don't find it, but we know the credentials exist in firebase, we add it to the database
      if (!found) {
        console.log("account not found in database, adding entry");
        db.User
          .create({
            username: data.email,
            admin_status: admin
          })
          .then((info) => {
            // and send back the relevant data for our state
            console.log("account added, logging in");
            // console.log(info);
            return info
          })
        // if we do find it, we send back the relevant data for our state
      } else if (found) {
        console.log("account found, logging in")
        // console.log(found);
        return found
      }
    })
}

// checking for admin privileges from login and verifying our users with the database
app.post("/login", function (req, res) {
  let idToken = req.body.token;

  // authenticating the token via firebase admin SDK
  admin.auth().verifyIdToken(idToken)
    .then(function (decodedToken) {

      // grabbing the uid from the decoded token
      let uid = decodedToken.uid
      console.log("UID RESOLVED: " + uid);
      console.log("--------------------------------------------------------");

      // verifying the info using the firebase admin sdk
      admin.auth().getUser(uid)
        .then(function (records) {
          console.log('Fetched user data: ', records.toJSON());
          let userInfo = records.toJSON();
          // actual check for admin custom claims, if so we return true
          verifyAdmin(userInfo);
          // verifying admin in database
          if (verifyAdmin(userInfo) === true) {
            console.log("verifying admin in database....");
            // look for our admin in database
            verifyInDatabase(userInfo, true, res);
            // if we know they're not an admin, we need to verify the user in database
          } else if (verifyAdmin(userInfo) === false) {
            console.log("verifying user in database....");
            verifyInDatabase(userInfo, false, res);
            if (found) {
              console.log(found);
            }
          }
        })
        .catch((err) => {
          throw err
        })
    })
})

// grabbing user info from login url
app.get("/login/:username", function (req, res) {
  console.log(req.params.username);
  db.User
    .findOne({
      where: {
        username: req.params.username
      }
    })
    .then(function (userData) {
      res.json(userData);
    })
})

// when a new tenant request is sent
app.post("/api/addtenant", function (req, res) {
  // first we create the user in our firebase database for authentication purposes
  admin.auth().createUser({
    email: req.body.username,
    password: "password"
  })
    .then(function (newUser) {
      // letting us know the new user was created successfully and gives us a uid to play with
      console.log("New user created in Firebase: " + newUser.email);
      console.log(newUser.email + " UID: " + newUser.uid);

      // set custom claims for our new user to be false by default
      admin.auth().setCustomUserClaims(newUser.uid, { admin: false })
        .then(() => {
          // verify their information in the database
          verifyInDatabase(newUser, false, res)
            .then(() => {
              // look up the newly created entry
              db.User
                .findOne({
                  where: {
                    username: newUser.email
                  }
                })
                .then(function (userData) {
                  // actuall add the new tenant information with a user id attached to reference later
                  let newUserId = userData.dataValues.id
                  db.Tenant
                    .create({
                      real_name: req.body.name,
                      unit_number: req.body.unit,
                      rent_amount: req.body.rent,
                      contact: req.body.contact,
                      UserId: newUserId
                    })
                    .then((newTenant) => {
                      console.log("New user added to database, ID: " + userData.dataValues.id)
                      console.log(newTenant);
                    })
                })
            })


        })

    })
    .catch(function (error) {
      throw error;
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
