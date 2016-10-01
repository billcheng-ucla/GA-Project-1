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

// Set home page
app.get('/', function(req, res) {

  db.Project.find({}, function(err, projects) {
		res.render('pages/index', {
			projects: projects
		});
  });
});

// Set all projects index page
app.get('/projects/:id', function(req, res) {
	res.render('pages/projects');
});

// Find all projects api path
app.get('/api/projects', function index(req, res) {
	db.Project.find({}, function(err, projects) {
		res.json(projects);
	});
});

// Find one project by id api path
app.get('/api/projects/:id', function show(req, res) {
	var projectID = req.params.id;
	db.Project.findOne({_id: projectID}, function(err, project) {
		if (err) { return console.log("project error: " + err);}
      	res.json(project);
	});
});

// Create a new project api path
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
		console.log(project);
		if (err) { console.log('error', err); }
		project.name = req.body.name;
		project.client = req.body.client;
		project.start = req.body.start;
		project.end = req.body.end;
		project.description = req.body.description;
		project.repo = req.body.repo;
		project.save(function(err, savedProject) {
			if(err) { console.log('error', err); }
			res.json(savedProject);
		});
	});
});

app.delete('/api/projects/:id', function destroy(req, res) {
	var projectID = req.params.id;
	db.Project.findOneAndRemove({_id: projectID}, function(err, deleteProject) {
		if (err) { return console.log("delete error: " + err);}
		res.json(deleteProject);
	});
});

//NIGHTLY
app.get('/api/projects/:projectid/scripts', function userStory_index(req, res) {
	var projectID = req.params.id;
	db.Project.findOne({_id: projectID}, function(err, project) {

	});
});

// Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
