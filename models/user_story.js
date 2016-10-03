var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var userStorySchema = new Schema( {
	story: String,
	finished: String
})

var UserStory = mongoose.model("UserStory", userStorySchema);
module.exports = UserStory;