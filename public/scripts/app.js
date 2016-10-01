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

	// catch and handle the click on an new project nav button
  $('#primary-nav').on('click', '.new-project-button', openNewProjectModal);

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

// Open New Project modal on nav button click
function openNewProjectModal() {
	var $modal = $('#projectModal');
	$('#projectModal').modal();
	console.log("New Project Button Clicked...	");
};

// Create new project from home page
function newProjectSuccess(json) {
	var $modal = $('#projectModal');
	$('#newProjectForm input').val('');
	allProjects.push(json);
	render();
	// close modal
  $modal.modal('hide');
};

// Throw error if unable to create new project home page 
function newProjectError() {
	console.log('Unable to add new project...');
};

function deleteProjectSuccess(json) {
	var project = json;
	var projectID = project._id;
	for(var index = 0; index < allProjects.length; index++) {
    if(allProjects[index]._id === projectID) {
      allProjects.splice(index, 1);
      break;  // we found our project - no reason to keep searching
    }
	}
	render();
};

function deleteProjectError() {
  console.log('deleteshow error!');
};
