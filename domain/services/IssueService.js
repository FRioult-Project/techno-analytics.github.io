var IssueRepo = require('../repositories/IssueRepo');

module.exports = {
    getAllIssues: function() {
        return new Promise(function(resolve) {

            IssueRepo.getAllIssues().then(function(technosDetails){
                resolve(technosDetails); // return all nerds in JSON format


            }, function (err) {
                console.log(err);
                resolve([]);


            })
        });

    },

    getIssueByTechno: function(techno) {
        return new Promise(function(resolve) {

            IssueRepo.getIssueByTechno(techno).then(function(Details){
                resolve(Details); // return all nerds in JSON format
                
            }, function (err) {
                console.log(err);
                resolve([]);

            })
        });

    }

};

