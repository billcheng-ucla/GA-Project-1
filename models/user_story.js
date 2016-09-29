var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var userStorySchema = new Schema( {
	story: String,
	finished: Boolean
})

var UserStory = mongoose.model("UserStory", userStorySchema);
module.exports = UserStory;