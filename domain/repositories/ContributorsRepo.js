var Commit = require('../models/ContributorsViews');

module.exports = {
    getAllContrs: function() {
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
    getContrsByTechno: function(techno) {
        return new Promise(function (resolve, reject) {
            Commit.find({'techno':techno},{'_id':0}, function (err, details) {
                if (err) {
                    reject(err);
                }
                resolve(details);
            })
        });
    },
    getContrsByName: function(name) {
        return new Promise(function (resolve, reject) {
            Commit.find({'name':name},{'_id':0}, function (err, details) {
                if (err) {
                    reject(err);
                }
                resolve(details);
            })
        });
    },
    getAllCommitsByTechno:function(techno) {
        return new Promise(function (resolve, reject) {
            Commit.find({'techno':techno},{'_id':0,'weeks':1}, function (err, details) {
                if (err) {
                    reject(err);
                }
                resolve(details);
            })
        });
    },
    createOrUpdateContr: function(contr) {
        return new Promise(function (resolve, reject) {
            Commit.update({id : contr.author.id}, contr, {upsert: true}, function (err,commitsUpdated) {
                if (err) {
                    reject(err);
                }
                resolve(commitsUpdated);
            })
        });
    }



};

