
// define our nerd model
// module.exports allows us to pass this to other files when it is called
//module.exports = connection.model('', {}, '');

var mongoose = require('mongoose');

var TechnoSchema = new mongoose.Schema({
    "id": Number,
    "techno":String,
    "side":String,
    "subtype":String,
    "name": String,
    "full_name": String,
    "created_at":Date,
    "updated_at":Date,
    "owner": {
        "login": String,
        "id": Number,
        "followers_url": String
    },
    "private": Boolean,
    "html_url":String,
    "url": String,
    "description": String,
    "fork": Boolean,
    "size": Number,
    "stargazers_count": Number,
    "watchers_count": Number,
    "language": String,
    "has_issues": Boolean,
    "has_downloads": Boolean,
    "has_wiki": Boolean,
    "forks_count": Number,
    "open_issues_count": Number,
    "default_branch": String,
    "network_count": Number,
    "subscribers_count": Number
});

module.exports = mongoose.model('techno', TechnoSchema);


