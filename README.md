# Opendoor

Opendoor is an easy to use and lightweight CRM tool geared towards small property owners, to make managing their multiple rental properties a little more automated. It uses React for a front end, with node.js, mySQL, and Firebase Authentication for a back-end.

## Using the Demo

If you're just here to demo the app, you'll need to log in using the following username and password:

* admin@admin.com
* adminadmin

This will give you administrator privileges to use the app. You can add and update tenant information, post and delete messages. Every user account you create has a sample password of "password". Feel free to play around.

## Getting Started With the Server

This application uses Firebase and the Firebase SDK for authentication. If you want to set this up as your own application, you will need to make an account at their website [here](https://firebase.google.com/). 

Once that's done, navigate to your console and add a project. You will need to do three things:

* Enable Authentication using the Authentication tab on the sidebar (you can set this up however you wish, but for basic functionality you will need just an email/password)


* Set up a configuration file for your Firebase service account credentials. This will let us use the Admin SDK on the server to do all sorts of neat things with our user data. 


To do this, in the Firebase console, click on the gear icon at the top of the sidebar, where it says "Project Overview", and go to Project Settings -> Service Accounts, and make sure Node.js is selected at the bottom.


Click on "Generate New Private Key", and this should give you a JSON file. Simply add this JSON file to the "config" folder in the root directory of the repository, and rename it to "opendoor-admin.json". 

<strong>Note: Keep this information safe. You can store it as an environment variable or just add the file to a .gitignore so it never gets uploaded anywhere public. If you need a new key, you can get a new one using the same process as above.</strong>

* Create a database in mySQL to use, and make sure you have the correct credentials set up in the ```config/sequelize.json``` file.


### Installing

Make sure you have node.js installed on your machine. After cloning the repository, run the following command in terminal at both the root directory <strong>and</strong> inside the my-app directory.

```npm install```

This installs the dependencies for both the server and the react client itself. 

## Running a Dev Environment

When running this app, you will need to run both the server and the React application on two different ports. These are set to 3001 and 3000, respectively, by default.

Every time you make changes to any items in the root directory, you'll need to restart the server.js file for those changes to apply. When making changes to any components or files in the my-app directory, React will update these automatically in the browser.

***

## How it Works

1. Authentication

To protect our routes, this app uses the Firebase Admin SDK to add custom claim tokens on whether or not a user has administrator privileges or not. This information is authenticated on the front end, and decoded on the back end to tell our React app what to render based on those custom tokens. 

2. Database

This app uses mySQL and Sequelize to create our database. Every time a user is added, it will populate a USER row and a TENANT row that is associated to that user. Any MESSAGE that gets posted is associated to a USER as well. The database is *only* ever talked to after the Firebase Admin SDK authenticates the login information and permissions on the server side. 



## Built With

* [Node.js](https://nodejs.org/en/) - Server side JavaScript and dependency management
* [React](https://reactjs.org/) - Front-End JavaScript Library
* [Firebase](https://firebase.google.com/) - Authentication
* [mySQL](https://www.mysql.com/) - Database
* [Bootstrap](https://getbootstrap.com/) - CSS and page structure
* [animate.css](https://daneden.github.io/animate.css/) - CSS animations
* [Moment.js](https://momentjs.com/) - Parsing times in JavaScript
* [Axios](https://github.com/axios/axios) - API interaction
* [Sequelize](http://docs.sequelizejs.com/) - Database interaction
* [Express](https://expressjs.com/) - Server structure, routing and frameworks


## Versioning

Version: 1.0.0

## Authors

* **Jake Duckworth** - *Authentication/Database/Server* - [Jake Duckworth](https://github.com/jakeD9)
* **Jason Eckhart** - *Component Design/UX* - [Jason Eckhart](https://github.com/Jeckhart582)
* **Seth Eugene Wils** - *Routing/API Integration/Moment* [Seth Eugene Wils](https://github.com/setheugene)

See also the list of [contributors](https://github.com/setheugene/opendoor/contributors) who participated in this project. 

