// Temp Data
var new_project = [
    {
    name: "Opt-in Form and Database",
    start: "5/11/2014",
    end: "5/12/2014",
    budget: 200,
    description: "Create a simple opt-in form that saves user information in a database.",
    userStories: [["User can enter their full name"],["User can enter their email address."],["User can see a confirmation message on submit."]],
    repo: "http://github.com/gottfried/optin-form",
    client: "Sara Gottfried"
    },
    {
    name: "Contact Form",
    start: "6/17/2014",
    end: "6/24/2014",
    budget: 250,
    description: "Create a simple contact form that saves user information in a database.",
    userStories: [["User can enter their full name"], ["User can enter their email address."],["User can see a confirmation message on submit."]],
    repo: "http://github.com/cushnir/conatct-form",
    client: "Raphael Cushnir"
    },
    {
    name: "Race Game",
    start: "8/2/2014",
    end: "8/26/2014",
    budget: 800,
    description: "Create a 2 player race game.",
    userStories: [["User can enter their full name"], ["User can enter their email address."],["User can see a confirmation message on submit."]],
    repo: "http://github.com/farrel/race-game",
    client: "Beth Farrel"
    },
    {
    name: "Album Database",
    start: "10/15/2014",
    end: "10/17/2014",
    budget: 15000,
    description: "Create a list of albums with information that can be easily updated.",
    userStories: [["User can enter their full name"], ["User can enter their email address."],["User can see a confirmation message on submit."]],
    repo: "http://github.com/west/album-app",
    client: "Kanye West"
    },
    {
    name: "Earthquake's Today with Google Maps",
    start: "11/8/2014",
    end: "11/9/2014",
    budget: 600,
    description: "Create a web page that lists earthquake information and location on Google Maps.",
    userStories: [["User can enter their full name"], ["User can enter their email address."],["User can see a confirmation message on submit."]],
    repo: "http://github.com/plottner/earthquake-app",
    client: "Kevin Plottner"
    }
];

var express = require('express'),
	app = express();

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// var db = require('./models');

app.use(express.static('public'));

// Routes

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});












// Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});