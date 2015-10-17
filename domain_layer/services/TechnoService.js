var TechnoRepo = require('../repositories/TechnoRepo');

module.exports = {
    getAllTechnos: function() {
        return new Promise(function(resolve, reject) {

            TechnoRepo.getAllTechnos().then(function(technosDetails){
                resolve(technosDetails); // return all nerds in JSON format


            }, function (err) {

                    reject(err);


            })
        });

    }



};

