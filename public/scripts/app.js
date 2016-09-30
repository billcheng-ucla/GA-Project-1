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
var getID;
var $bodyClass;
if(getID)
{
	console.log(getID);
}
$(document).ready(function(){

	$body = $('body');
	$projectsList = $('#current-projects-list');

	// compile handlebars template
	if($body.hasClass('home')) {
		var source = $('#projects-template').html();
		template = Handlebars.compile(source);
	}
	if($body.hasClass('detail')) {
		var url = $(location).attr("href");
		var urlParts = url.split('/');
		var id = urlParts[4];
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

// Render Projects DB to home page
function showSuccess(json) {
	allProjects = json;
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
