var mongoose = require('mongoose');


var express = require('express'),
	app = express();


// set the view engine to ejs	
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var db = require('./models');

app.use(express.static('public'));

// Routes

// app.get('/', function homepage (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

//set home page
app.get('/', function(req, res) {
	res.render('pages/index');
});

//set projects page
app.get('/projects', function(req, res) {
	res.render('pages/projects');
});

app.get('/api/projects', function index(req, res) {
	db.Project.find({}, function(err, projects) {
		res.json(projects);
	});
});






// Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});