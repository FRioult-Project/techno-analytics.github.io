var Technos = require('../models/TechnosViews');

module.exports = {
    getAllTechnos: function() {
        return new Promise(function(resolve, reject) {
            Technos.find({}, {
                '_id': 0,
                'school_state': 1,
                'resource_type': 1,
                'poverty_level': 1,
                'date_posted': 1,
                'total_donations': 1,
                'funding_status': 1,
                'grade_level': 1
            }, function (err, technosDetails) {
                // if there is an error retrieving, send the error.
                // nothing after res.send(err) will execute
                if (err){
                    reject(err);
                }
                resolve(technosDetails); // return all nerds in JSON format
            })
        });

    }
};

