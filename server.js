const express = require("express");
const sequelize = require("sequelize");
const routes = require("./routes");
const db = require("./models");
const app = express();

// firebase service sdk
const admin = require("firebase-admin")
const serviceAccount = require("./config/opendoor-admin.json");

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// blocking CORS errors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("my-app/build"));
}

var syncOptions = { force: true };

// firebase admin sdk, anytime we interact with firebase we want to be on this file
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
let verifyInDatabase = (data, admin, res) => {
  db.User
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
            console.log("account added");
            res.json(info)
          })
        // if we do find it, we send back the relevant data for our state
      } else if (found) {
        console.log("account found, logging in")
        res.json(found);
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
            verifyInDatabase(userInfo, true, res)
              .then((response) => {
                res.json(response);
              })
            // if we know they're not an admin, we need to verify the user in database
          } else if (verifyAdmin(userInfo) === false) {
            console.log("verifying user in database....");
            verifyInDatabase(userInfo, false, res)
              .then((response) => {
                res.json(response);
              })
          }
        })
        .catch((err) => {
          throw err
        })
    })
})

// grabbing user info from login url
app.get("/login/:username", function (req, res) {
  console.log("LOOKING UP: " + req.params.username);
  db.User
    .findOne({
      where: {
        username: req.params.username
      }
    })
    .then(function (userData) {
      console.log("User found, sending...");
      res.json(userData);
    })
})

// when a new tenant request is sent
app.post("/addtenant", function (req, res) {
  // first we create the user in our firebase database for authentication purposes
  admin.auth().createUser({
    email: req.body.username,
    password: "password"
  })
    .then(function (newUser) {
      // letting us know the new user was created successfully and gives us a uid to play with
      console.log("New user created in Firebase: " + newUser.email);
      console.log(newUser.email + " UID: " + newUser.uid);

      // set custom admin claims for our new user to be false by default
      admin.auth().setCustomUserClaims(newUser.uid, { admin: false })
        .then(() => {
          // create their information in the users table
          db.User
            .create({
              username: newUser.email,
              admin_status: false
            })
            .then((response) => {
              // look up the newly created entry to get their id
              db.User
                .findOne({
                  where: {
                    username: newUser.email
                  }
                })
                .then(function (userData) {
                  // console.log(userData);
                  // actually add the new tenant information with a user id attached to reference later
                  let newUserId = userData.dataValues.id
                  db.Tenant
                    .create({
                      real_name: req.body.real_name,
                      unit_number: req.body.unit_number,
                      rent_amount: req.body.rent_amount,
                      contact: req.body.contact,
                      lease: req.body.lease,
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
      console.log(error);
    })
})

app.delete("/api/all/tenants", (req, res) => {
  // first we delete the user in our database
  db.User
    .destroy({
      where: {
        id: req.body.id
      }
    }).then((dbData) => {
      console.log("Removing user data from DB for User ID: " + req.body.id)
      res.json(dbData);
      // then we remove them from firebase as well
      admin.auth().deleteUser(req.body.uid)
        .then(() => {
          console.log("User removed from Firebase login")
        })
        .catch((err) => {
          throw err
        });
    });
});

app.get("*", (req, res) => {
  let url = path.join(__dirname, '../client/build', 'index.html');
  if (!url.startsWith('/app/')) // since we're on local windows
    url = url.substring(1);
  res.sendFile(url);
});

db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
