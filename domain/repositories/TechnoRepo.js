var Technos = require('../models/TechnosViews');

module.exports = {
    getAllTechnos: function() {
        return new Promise(function (resolve, reject) {
            Technos.find({}, {
                '_id': 0,
                'id': 0
            }, function (err, technosDetails) {
                // if there is an error retrieving, send the error.
                // nothing after res.send(err) will execute
                if (err) {
                    reject(err);
                }
                resolve(technosDetails); // return all nerds in JSON format
            })
        });
    },
    saveTechno: function(techno) {
            return new Promise(function (resolve, reject) {
                Technos.create(techno, function (err, post) {
                    if (err)
                        reject(err);
                    resolve(post);
                });
            });
    },
    getTechno: function(techno) {
        return new Promise(function (resolve, reject) {
            Technos.find({'techno':techno},{'_id':0}, function (err, technoDetails) {
                // if there is an error retrieving, send the error.
                // nothing after res.send(err) will execute
                if (err) {
                    reject(err);
                }
                resolve(technoDetails);
            })
        });
    },
    createOrUpdateTechno: function(techno) {
        return new Promise(function (resolve, reject) {
            Technos.update({id: techno.id}, techno, {upsert: true}, function (err,technosUpdated) {
                if (err) {
                    reject(err);
                }
                resolve(technosUpdated);
            })
        });
    }



};

