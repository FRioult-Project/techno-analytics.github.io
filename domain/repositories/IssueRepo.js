var Technos = require('../models/IssuesViews');

module.exports = {
    getAllIssues: function() {
        return new Promise(function (resolve, reject) {
            Technos.find({}, {
                '_id': 0,
                'id': 0
            }, function (err, Details) {
                // if there is an error retrieving, send the error.
                // nothing after res.send(err) will execute
                if (err) {
                    reject(err);
                }
                resolve(Details); // return all nerds in JSON format
            })
        });
    },

    getIssueByTechno: function(techno) {
        return new Promise(function (resolve, reject) {
            Technos.find({'techno':techno},{'_id':0}, function (err, Details) {
                if (err) {
                    reject(err);
                }
                resolve(Details);
            })
        });
    },
    createOrUpdateIssue: function(techno) {
        return new Promise(function (resolve, reject) {
            Technos.update({id: techno.id}, techno, {upsert: true}, function (err,Updated) {
                if (err) {
                    reject(err);
                }
                resolve(Updated);
            })
        });
    }



};

