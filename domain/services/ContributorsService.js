var CommitRepo = require('../repositories/ContributorsRepo');

module.exports = {
    getAllCommits: function() {
        return new Promise(function(resolve) {

            CommitRepo.getAllContrs().then(function(details){
                resolve(details);
            }, function (err) {
                console.log(err);
                resolve([]);


            })
        });

    },

    getCommitsByTechno: function(techno) {
        return new Promise(function(resolve) {

            CommitRepo.getContrsByTechno(techno).then(function(details){
                resolve(details);
            }, function (err) {
                console.log(err);
                resolve([]);


            })
        });

    },
    getCommitsByTechno: function(techno) {
        return new Promise(function(resolve) {

            CommitRepo.getContrsByTechno(techno).then(function(details){
                resolve(details);
            }, function (err) {
                console.log(err);
                resolve([]);


            })
        });

    },
    getAllCommitsByName: function(techno) {
        return new Promise(function(resolve) {

            CommitRepo.getContrsByName(techno).then(function(details){
                resolve(details);
            }, function (err) {
                console.log(err);
                resolve([]);


            })
        });

    }

};

