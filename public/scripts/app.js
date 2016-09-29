console.log("It's ALIVE...!");

var allProjects = [];

$(document).ready(function(){

// EJS setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


}); // End Document Ready

