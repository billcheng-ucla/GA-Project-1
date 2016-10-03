console.log("It's ALIVE...!");


var template;
var $projectsList;
var allProjects = [];
var $singleProjectList;
var singleProject;
var projectDetailList;
var singleDetail;
var $userStoryList;
var singleStory;
var $bodyClass;


$(document).ready(function(){

	$body = $('body');
	$projectsList = $('#current-projects-list');
	$singleProjectList = $('#update-project-details');
	$projectDetailList = $('#project-details');
	$userStoryList = $('#user-story-section');
	

	// Compile Handlebars template for Home page
	if($body.hasClass('home')) {
		var source = $('#projects-template').html();
		template = Handlebars.compile(source);
	};

	// Ajax project detail call for Projects page
	getProjectDetails();

	// Add Projects DB to Home page without page refresh
	$.ajax({
		method: 'GET',
		url: '/api/projects',
		success: showSuccess,
		error: showError
	});

	// Handle click event on home page Current Project List
	$('#current-projects-list').on('click', '.project-card-small', function(e) {
		var id = $(this).attr('data-id');
		url = "/projects/" + id;
		$( location ).attr("href", url);
	});

	// Handle click event on home page Current Project List delete
	$('#current-projects-list').on('click', '.current-project-delete', function(e) {
		var id = $(this).attr('data-id');
		$.ajax({
			method: 'DELETE',
			url: '/api/projects/' + id,
			success: deleteProjectSuccess,
			error: deleteProjectError
		});
	});

	// Handle click event on new project nav button
  $('#primary-nav').on('click', '.new-project-button', openNewProjectModal);

  	// Handle click event on update project details button
  $('#project-detail-section').on('click', '.update-project-details', openUpdateProjectModal);

  $('#user-story-container').on('click', '.add-user-story', openUserStoryModal);

	// Add a new project from modal to Project DB without page refresh
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

	// Handle click event on projects page update button
	$('#updateProjectForm').on('submit', '.update-project-submit', function(e) {
		e.preventDefault();
		console.log("Hello");
	});

}); // End Document Ready



// Ajax project detail call for Projects page
function getProjectDetails() {
	if($body.hasClass('detail')) {
		var url = $(location).attr("href");
		var urlParts = url.split('/');
		var id = urlParts[4];
		$.ajax({
			method: 'GET',
			url: '/api/projects/' + id,
			// success: singleShowSuccess,
			// error: showError
		})
		.done(singleShowSuccess)
		.done(singleDetailSuccess)
		.done(userStorySuccess)
		.fail(showError)
	}
};

// Render poject details to the Projects page details section
function singleDetailSuccess(json) {
	var source = $('#project-detail-template').html();
	template = Handlebars.compile(source);
	singleDetail = json;
	console.log("Project is " + singleDetail);
	singleDetailRender();
};

// Render a single project to the Projects page details section
function singleDetailRender() {
	if($body.hasClass('detail')) {
		// Remove existing projects from $projectDetailList
		$projectDetailList.empty();
		// Pass singleDetail into the template function
		var projectDetailHtml = template({ projectDetail: singleDetail });
		// Append html to the $projectDetailList
		$projectDetailList.append(projectDetailHtml);
		console.log(singleDetail);
	}
};

// Render user stories to Projects page
function userStorySuccess(json) {
	var source = $('#user-story-template').html();
	template = Handlebars.compile(source);
	singleStory = json;
	console.log("Story is " + singleStory);
	userStoryRender();
};

// Render User Stories to the Projects page
function userStoryRender() {
	if($body.hasClass('detail')) {
		// Remove existing projects from $userStoryList
		$userStoryList.empty();
		// Pass singleStory into the template function
		var userStoryHtml = template({ userStory: singleStory });
		// Append html to the $userStoryHtml
		$userStoryList.append(userStoryHtml);
	}
};

// Render poject details to update form on Projects page
function singleShowSuccess(json) {
	var source = $('#update-project-form').html();
	template = Handlebars.compile(source);
	singleProject = json;
	console.log("Project to update is " + singleProject);
	singleRender();
};

// Render a single project to the Projects page
function singleRender() {
	if($body.hasClass('detail')) {
		// Remove existing projects from $singleProjectList
		$singleProjectList.empty();
		// Pass singleProject into the template function
		var singleProjectHtml = template({ project: singleProject });
		// Append html to the $singleProjectList
		$singleProjectList.append(singleProjectHtml);
	}
	$('.update-project-submit').on('click', handleUpdate);
	$('#user-story-form').on('submit', newUserStory);
};

// Render all projects to home page
function showSuccess(json) {
	allProjects = json;
	render();
};

// Render all projects to the home page
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

// Throw error if unable to render Projects to home page
function showError(e) {
	console.log('Error rendering projects...');
	$('#current-projects-list').text('Unable to show projects...');
};

// Open New Project modal on nav button click
function openNewProjectModal() {
	var $modal = $('#projectModal');
	$('#projectModal').modal();
};

// Open Update Project Details modal on click
function openUpdateProjectModal() {
	var $modal = $('#updateprojectModal');
	$('#updateprojectModal').modal();
};

// Open Update Project Details modal on click
function openUserStoryModal() {
	var $modal = $('#userStoryModal');
	$('#userStoryModal').modal();
};

// Create new project from home page
function newProjectSuccess(json) {
	var $modal = $('#projectModal');
	$('#newProjectForm input').val('');
	allProjects.push(json);
	render();
	// close modal
  $modal.modal('hide');
}

// Throw error if unable to create new project home page 
function newProjectError() {
	console.log('Unable to add new project...');
}

// Handle delete one project by id
function deleteProjectSuccess(json) {
	var project = json;
	var projectID = project._id;
	for(var index = 0; index < allProjects.length; index++) {
    if(allProjects[index]._id === projectID) {
      allProjects.splice(index, 1);
      break;  // we found our project - no reason to keep searching (this is why we didn't use forEach)
    }
	}
	render();

};

// Handle error on delete one project by id
function deleteProjectError() {
  console.log('deleteshow error!');
}

// Handle project update from projects page
function handleUpdate(e) {
	e.preventDefault();
	var id = getID();
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
	// close Update Project Details modal
	var $modal = $('#updateprojectModal');
  $modal.modal('hide');
}

function getID(index = -1)
{
	var url = $(location).attr("href");
	var urlParts = url.split('/');
	if(index < 0)
	{
		index = urlParts.length - 1;
	}
	return urlParts[index];
}

//Nightly
function newUserStory(e) {
	e.preventDefault();
	var id = getID();
	$.ajax({
	  method: 'POST',
	  url: '/api/projects/' + id + '/scripts',
	  data: $(this).serialize(),
	  success: newUserStorySuccess,
	  error: newUserStoryError
	});
}

function newUserStorySuccess(json) {
	var $modal = $('#userStoryModal');
	// $('#newProjectForm input').val(''); // We need something like this this is just placeholder
	singleDetail.userStories.push(json);
	singleDetailRender();
	$modal.modal('hide');
}

function newUserStoryError(err) {
	console.log(err);
	console.log("Failed to add UserStory");
}

// function userStoryUpdate(e) {
// 	e.preventDefault();
// 	var projectID = getID(4);
// 	var userStoryID = getID();

// }
