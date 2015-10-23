var token = require('../../config/token');
var TechnosRepo = require('../../domain/repositories/TechnoRepo');
var CommitRepo = require('../../domain/repositories/CommitRepo');
var IssueRepo = require('../../domain/repositories/IssueRepo');

var Github = require('github-api');
var github = new Github({
    token: token.token,
    auth: "oauth"
});

saveRepo = function(techno){
    TechnosRepo.createOrUpdateTechno(techno);
};

saveIssue = function(issue){
   IssueRepo.createOrUpdateIssue(issue);
};

saveCommit = function(commit){
    CommitRepo.createOrUpdateCommit(commit);
};

//repository commits
getCommits = function(repo,tech) {
    repo.getCommits({}, function (err, data) {
        if (err) {
            console.log("err commits: " + JSON.stringify(err));
        }

        var commit = JSON.parse(JSON.stringify(data));
        for(var i=0; i<commit.length;i++){
            commit[i].techno = tech;
            saveCommit(commit[i]);
        }
    });
}

//repository issues
getIssues = function(repo,user,tech){
    var issues = github.getIssues(user, repo);
    issues.list({}, function(err, issues) {
        if(err)
            console.log("err issues: " + JSON.stringify(err));
        var issues = JSON.parse(JSON.stringify(issues));
        for(var i=0; i<issues.length;i++){
            issues[i].techno = tech;
            saveIssue(issues[i]);
        }
    });
};


get = function(user,repoName,tech,side,subtype){

    //Repository infos
    var repo = github.getRepo(user,repoName);
    repo.show(function (err, repos) {
        if (err)
            return err;
        repos.techno=tech;
        repos.side=side;
        repos.subtype=subtype;
        saveRepo(repos);
    });

    //repository commits
    this.getCommits(repo,tech);
    //repository issues
    this.getIssues(repoName,user,tech);
};

module.exports = {
    getInfos: function () {
        //Client side frameworks
        get('jashkenas','backbone','backbone.js',"Client Side","");
        get("angular","angular.js",'angular.js',"Client Side","");
        get("emberjs","ember.js",'ember.js',"Client Side","");

        //Server side frameworks
        //subtype : Sinatra-like
        get("strongloop","express",'Node.js',"Server Side","Sinatra-like");
        get("hapijs","hapi",'Node.js',"Server Side","Sinatra-like");
        get("flatiron","flatiron",'Node.js',"Server Side","Sinatra-like");
        get("jaredhanson","locomotive",'Node.js',"Server Side","Sinatra-like");
        get("totaljs","framework",'Node.js',"Server Side","Sinatra-like");
        get("koajs","koa",'Node.js',"Server Side","Sinatra-like");
        get("tweeio","twee-framework",'Node.js',"Server Side","Sinatra-like");
        get("adamhalasz","diet",'Node.js',"Server Side","Sinatra-like");
        //subtype : Rails-like
        get("1602","compound",'Node.js',"Server Side","Rails-like");
        get("geddy","geddy",'Node.js',"Server Side","Rails-like");
        get("balderdashy","sails",'Node.js',"Server Side","Rails-like");
        get("adonisjs","adonis-framework",'Node.js',"Server Side","Rails-like");
        get("rhapsodyjs","RhapsodyJS",'Node.js',"Server Side","Rails-like");
        get("wistityhq","strapi",'Node.js',"Server Side","Rails-like");

    }
};