var CommitRepo = require('../repositories/CommitRepo');

module.exports = {
    getAllCommits: function() {
        return new Promise(function(resolve) {

            CommitRepo.getAllCommits().then(function(details){
                resolve(details);
            }, function (err) {
                console.log(err);
                resolve([]);


            })
        });

    },

    getCommitsByTechno: function(techno) {
        return new Promise(function(resolve) {

            CommitRepo.getCommitsByTechno(techno).then(function(details){
                resolve(details);
            }, function (err) {
                console.log(err);
                resolve([]);


            })
        });

    }

};

