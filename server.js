var mongoose = require('mongoose');


var express = require('express'),
	app = express();


// EJS setup	
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);


// Body-Parser Setup
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

//set home page
app.get('/', function(req, res) {

  db.Project.find({}, function(err, projects) {
		res.render('pages/index', {
			projects: projects
		});
  });
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
