var TechnoRepo = require('../repositories/TechnoRepo');

module.exports = {
    getAllTechnos: function() {
        return new Promise(function(resolve) {

            TechnoRepo.getAllTechnos().then(function(technosDetails){
                resolve(technosDetails); // return all nerds in JSON format


            }, function (err) {

                resolve([]);


            })
        });

    },

    getTechno: function(techno) {
        return new Promise(function(resolve) {

            TechnoRepo.getTechno(techno).then(function(technosDetails){
                resolve(technosDetails); // return all nerds in JSON format

            }, function (err) {

                resolve([]);


            })
        });

    },

    getServerSideTechno : function(name) {
        return new Promise(function(resolve) {

            TechnoRepo.getServerSideTechno(name).then(function(technosDetails){
                resolve(technosDetails); // return all nerds in JSON format

            }, function (err) {

                resolve([]);


            })
        });

    }

};

