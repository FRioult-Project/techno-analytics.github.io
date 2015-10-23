var Commit = require('../models/CommitsViews');

module.exports = {
    getAllCommits: function() {
        return new Promise(function (resolve, reject) {
            Commit.find({}, {
                '_id': 0,
                'id': 0
            }, function (err, details) {
                if (err) {
                    reject(err);
                }
                resolve(details);
            })
        });
    },
    getCommitsByTechno: function(techno) {
        return new Promise(function (resolve, reject) {
            Commit.find({'techno':techno},{'_id':0}, function (err, details) {
                if (err) {
                    reject(err);
                }
                resolve(details);
            })
        });
    },
    createOrUpdateCommit: function(techno) {
        return new Promise(function (resolve, reject) {
            Commit.update({sha: techno.sha}, techno, {upsert: true}, function (err,commitsUpdated) {
                if (err) {
                    reject(err);
                }
                resolve(commitsUpdated);
            })
        });
    }



};

