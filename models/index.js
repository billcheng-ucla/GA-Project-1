var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/project-1");

var Project = require('./project.js');

module.exports.Project = Project;
module.exports.UserStory = require('./user_story.js');