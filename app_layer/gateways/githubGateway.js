var Github = require('github-api');
var github = new Github({
    token: "69624c8c5e6f93a2bd28474b2ba35bd5f10167e4",
    auth: "oauth"
});

var repo = github.getRepo('michael', 'github');



module.exports = {
    getInfos: function () {
        return new Promise(function (resolve, reject) {

            repo.show(function (err, repos) {
                if (err)
                    reject(err);

                resolve(repos);
            })

        });

    }
}