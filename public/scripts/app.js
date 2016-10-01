console.log("It's ALIVE...!");
var url = $(location).attr("href");
console.log(url);
var urlParts = url.split('/');
if(urlParts.length > 4)
{
	var id = urlParts[4];
	console.log(id);
}
var template;
var $projectsList;
var allProjects = [];
var $singleProjectList;
var singleProject;
var getID;
var $bodyClass;

if(getID) {
	console.log(getID);
}

$(document).ready(function(){

	$body = $('body');
	$projectsList = $('#current-projects-list');
	$singleProjectList = $('#project-detail-form');

	// compile handlebars template
	if($body.hasClass('home')) {
		var source = $('#projects-template').html();
		template = Handlebars.compile(source);
	} else {
		var source = $('#single-project-template').html();
		template = Handlebars.compile(source);
	}
	if($body.hasClass('detail')) {
		var url = $(location).attr("href");
		var urlParts = url.split('/');
		var id = urlParts[4];
		$.ajax({
			method: 'GET',
			url: '/api/projects/' + id,
			success: singleShowSuccess,
			error: showError
		});
	}

	// add Projects DB to home page view without page refresh
	$.ajax({
		method: 'GET',
		url: '/api/projects',
		success: showSuccess,
		error: showError
	});

	// Add a new project to Project DB without page refresh
	$('#newProjectForm').on('submit', function(e) {
		e.preventDefault();
		$.ajax({
		  method: 'POST',
		  url: '/api/projects',
		  data: $(this).serialize(),
		  success: newProjectSuccess,
		  error: newProjectError
		});
	});

	$('#current-projects-list').on('click', '.project-card-small', function(e) {
		var id = $(this).attr('data-id');
		url = "/projects/" + id;
		$( location ).attr("href", url);
	});

	$('#current-projects-list').on('click', '.current-project-delete', function(e) {
		var id = $(this).attr('data-id');
		$.ajax({
			method: 'DELETE',
			url: '/api/projects/' + id,
			success: deleteProjectSuccess,
			error: deleteProjectError
		});
	});
	$('#updateProjectForm').on('submit', '.update-project-submit', function(e) {
		e.preventDefault();
		console.log("Hello");
	});

}); // End Document Ready

// First remove all projects, then render all projects to home page
function render() {
	if($body.hasClass('home')) {
		
		// Remove existing projects from projects list on home page
		$projectsList.empty();
		// Pass allProjects into the template function
		var projectsHtml = template({ projects: allProjects });
		// Append html to the projects list on home page
		$projectsList.append(projectsHtml);
	}
};

// First remove all projects, then render all projects to home page
function singleRender() {
	if($body.hasClass('detail')) {
		
		// Remove existing projects from projects list on home page
		$singleProjectList.empty();
		// Pass allProjects into the template function
		var singleProjectHtml = template({ project: singleProject });
		// Append html to the projects list on home page
		$singleProjectList.append(singleProjectHtml);
	}
	$('.update-project-submit').on('click', handleUpdate);
};

// Render a single project to /project page
function singleShowSuccess(json) {
	singleProject = json;
	console.log("Single project is " + singleProject);
	singleRender();
};

// Render all projects to home page
function showSuccess(json) {
	allProjects = json;
	render();
};

// Throw error if unable to render Projects to home page
function showError(e) {
	console.log('Error rendering projects...');
	$('#current-projects-list').text('Unable to show projects...');
};

// Create new project from home page
function newProjectSuccess(json) {
	$('#newProjectForm input').val('');
	allProjects.push(json);
	render();
}

// Throw error if unable to create new project home page 
function newProjectError() {
	console.log('Unable to add new project...');
}

function deleteProjectSuccess(json) {
	var project = json;
	var projectID = project._id;
	for(var index = 0; index < allProjects.length; index++) {
	    if(allProjects[index]._id === projectID) {
	      allProjects.splice(index, 1);
	      break;  // we found our show - no reason to keep searching (this is why we didn't use forEach)
	    }
	}
	render();

}

function deleteProjectError() {
  console.log('deleteshow error!');
}

function handleUpdate(e)
{
	e.preventDefault();
	var url = $(location).attr("href");
	var urlParts = url.split('/');
	var id = urlParts[4];
	var $form = $(this).parent();
	console.log($form.find('[name="name"]').val());
	var data = {
		name: $form.find('[name="name"]').val(),
		client: $form.find('[name="client"]').val(),
		start: $form.find('[name="start"]').val(),
		end: $form.find('[name="end"]').val(),
		description: $form.find('[name="description"]').html(),
		repo: $form.find('[name="repo"]').val()
	};

	$.ajax( {
		method: 'PUT',
		url: '/api/projects/' + id,
		data: data,
		success: function(data) {
			console.log(data);
		},
		error: function(error) {
			console.log(error);
		}

	});
}
