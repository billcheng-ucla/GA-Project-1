
var db = require("./models");
var projectsList = [
    {
    name: "Opt-in Form and Database",
    start: "5/11/2014",
    end: "5/12/2014",
    budget: 200,
    description: "Create a simple opt-in form that saves user information in a database.",
    userStories: [],
    repo: "http://github.com/gottfried/optin-form",
    client: "Sara Gottfried"
    },
    {
    name: "Contact Form",
    start: "6/17/2014",
    end: "6/24/2014",
    budget: 250,
    description: "Create a simple contact form that saves user information in a database.",
    userStories: [],
    repo: "http://github.com/cushnir/conatct-form",
    client: "Raphael Cushnir"
    },
    {
    name: "Race Game",
    start: "8/2/2014",
    end: "8/26/2014",
    budget: 800,
    description: "Create a 2 player race game.",
    userStories: [],
    repo: "http://github.com/farrel/race-game",
    client: "Beth Farrel"
    },
    {
    name: "Album Database",
    start: "10/15/2014",
    end: "10/17/2014",
    budget: 15000,
    description: "Create a list of albums with information that can be easily updated.",
    userStories: [],
    repo: "http://github.com/west/album-app",
    client: "Kanye West"
    },
    {
    name: "Earthquake's Today with Google Maps",
    start: "11/8/2014",
    end: "11/9/2014",
    budget: 600,
    description: "Create a web page that lists earthquake information and location on Google Maps.",
    userStories: [],
    repo: "http://github.com/plottner/earthquake-app",
    client: "Kevin Plottner"
    }
];

projectsList.forEach(function(project) {
    //console.log(this);
    var us = new db.UserStory({story: "User can click on a button.", finished: true});
    us.save();
    project.userStories.push(us);
    var us2 = new db.UserStory({story: "User can edit content", finished: false});
    us2.save()
    project.userStories.push(us2);

});


db.Project.remove({}, function(err, projects){

 db.Project.create(projectsList, function(err, projects){
   if (err) { return console.log('ERROR', err); }
   console.log("all projects:", projects);
   console.log("created", projects.length, "projects");
   process.exit();
 });

});
