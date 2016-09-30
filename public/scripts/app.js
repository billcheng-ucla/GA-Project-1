console.log("It's ALIVE...!");

var template;
var $projectsList;
var allProjects = [];

$(document).ready(function(){

	$projectsList = $('#current-projects-list');

	// compile handlebars template
	var source = $('#projects-template').html();
	template = Handlebars.compile(source);

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

}); // End Document Ready

// First remove all projects, then render all projects to home page
function render() {
	// Remove existing projects from projects list on home page
	$projectsList.empty();
	// Pass allProjects into the template function
	var projectsHtml = template({ projects: allProjects });
	// Append html to the projects list on home page
	$projectsList.append(projectsHtml);
};

// Render Projects DB to home page
function showSuccess(json) {
	allProjects = json;
	console.log("Got all projects");
	render();
};

// Throw error if unable to render Projects to home page
function showError(e) {
	console.log('Error rendering projects...');
	$('#current-projects-list').text('Unable to show movies...');
};

// Adds new movie from form data on home page view
function newProjectSuccess(json) {
	$('#newMovieForm input').val('');
	allProjects.push(json);
	render();
}

// Throw error if unable to add new movie from form data on home page view
function newProjectError() {
	console.log('Unable to add new movie...');
}
