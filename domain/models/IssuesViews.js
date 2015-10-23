// define our nerd model
// module.exports allows us to pass this to other files when it is called
//module.exports = connection.model('', {}, '');

var mongoose = require('mongoose');

var TechnoSchema = new mongoose.Schema({
    "id": Number,
    "techno":String,
    "created_at":Date,
    "updated_at":Date,
    "closed_at": Date,
    "state": String,
    "html_url":String,
    "title": String,
    "type": String,
    "body" : String
});

module.exports = mongoose.model('issue', TechnoSchema);


