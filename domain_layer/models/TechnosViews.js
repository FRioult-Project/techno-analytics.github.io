
// define our nerd model
// module.exports allows us to pass this to other files when it is called
//module.exports = connection.model('', {}, '');

var mongoose = require('mongoose');

var TechnoSchema = new mongoose.Schema({
    'school_state': String,
    'resource_type': String,
    'poverty_level': String,
    'date_posted': String,
    'total_donations': Number,
    'funding_status': String,
    'grade_level': String
});

module.exports = mongoose.model('projects', TechnoSchema);


