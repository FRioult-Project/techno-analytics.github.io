
// define our nerd model
// module.exports allows us to pass this to other files when it is called
//module.exports = connection.model('', {}, '');

var mongoose = require('mongoose');

var ContrSchema = new mongoose.Schema({
    "total": Number,
    "techno":String,
    "name":String,
    "author": {
        "login": String,
        "id": Number
    },
    "weeks":[
        {
            "w": String,
            "a": String,
            "d": String,
            "c": String
        }
    ]
});

module.exports = mongoose.model('contributer', ContrSchema);


