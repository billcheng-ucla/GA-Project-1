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

app.get('/api/projects/:id', function show(req, res) {
	var projectID = req.params.id;
	db.Project.findOne({_id: projectID}, function(err, project) {
		if (err) { return console.log("project error: " + err);}
      	res.json(project);
	});
});

app.post('/api/projects', function create(req, res) {
	db.Project.create(req.body, function(err, project) {
		if (err) { console.log('error', err); }
		console.log(project);
		res.json(project);
	});
});

app.put('/api/projects/:id', function update(req, res) {
	var projectID = req.params.id;
	db.Project.findOne({_id: projectID}, function(err, project) {
		project = req.body;
		project.save(function(err, savedProject) {
			res.json(savedProject);
		});
	});
});

app.put('/api/projects/:id', function destroy(req, res) {
	var projectID = req.params.id;
	db.Project.findOneAndRemove({_id: projectID}, function(err, deleteProject) {
		if (err) { return console.log("delete error: " + err);}
		res.json(deleteShow);
	});
});

// Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
