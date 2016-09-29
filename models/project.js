var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserStory = require('./user_story.js');

var projectSchema = new Schema( {
	name: String,
  start: String,
  end: String,
  budget: Number,
  description: String,
  userStories: [UserStory.schema],
  repo: String,
  client: String
});

var Project = mongoose.model("Project", projectSchema);
module.exports = Project;