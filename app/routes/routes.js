var TechnoService = require('../../domain/services/TechnoService');
var CommitService = require('../../domain/services/CommitService');
var IssueService = require('../../domain/services/IssueService');
var contrsService = require('../../domain/services/ContributorsService');
module.exports = function(app) {

    // server routes ===========================================================

    //All Technos infos route
    app.get('/api/technos', function(req, res) {
     TechnoService.getAllTechnos().then(function(Technos){
         res.json(Technos);
     })
    });

    //Techno infos route
    app.get('/api/technos/:techno', function(req, res) {
        TechnoService.getTechno(req.params.techno).then(function(Techno){
            res.json(Techno);
        })
    });

    //Techno infos route
    app.get('/api/technos/Node.js/:name', function(req, res) {
        TechnoService.getServerSideTechno(req.params.name).then(function(Techno){
            res.json(Techno);
        })
    });

    //Techno infos route
    app.get('/api/contrs/Node.js/:name', function(req, res) {
        contrsService.getAllCommitsByName(req.params.name).then(function(Techno){
            res.json(Techno);
        })
    });

    //commits technos infos route
    app.get('/api/commits', function(req, res) {
        CommitService.getAllCommits().then(function(Technos){
            res.json(Technos);
        })
    });

    //commits by techno infos route
    app.get('/api/commits/:techno', function(req, res) {
        CommitService.getCommitsByTechno(req.params.techno).then(function(commits){
            res.json(commits);
        })
    });

    //contrs technos infos route
    app.get('/api/contrs', function(req, res) {
        contrsService.getAllCommits().then(function(Technos){
            res.json(Technos);
        })
    });

    //contrs by techno infos route
    app.get('/api/contrs/:techno', function(req, res) {
        contrsService.getCommitsByTechno(req.params.techno).then(function(commits){
            res.json(commits);
        })
    });

    //contrs by techno infos route
    app.get('/api/contrs/commits/:techno', function(req, res) {
        contrsService.getAllCommitsByTechno(req.params.techno).then(function(commits){
            res.json(commits);
        })
    });

    //issues technos infos route
    app.get('/api/issues', function(req, res) {
        IssueService.getAllIssues().then(function(issues){
            res.json(issues);
        })
    });

    //issues by techno infos route
    app.get('/api/issues/:techno', function(req, res) {
        IssueService.getIssueByTechno(req.params.techno).then(function(issues){
            res.json(issues);
        })
    });

 // frontend routes =========================================================
 app.get('*', function(req, res) {
  res.sendfile('../../public/index.html');
 });
}