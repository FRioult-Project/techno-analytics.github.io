var TechnoService = require('../../domain_layer/services/TechnoService');
module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes	
	// sample api route
 app.get('/api/data', function(req, res) {
     TechnoService.getAllTechnos().then(function(Technos){
         res.json(Technos); // return all Technos in JSON format
     })

 });

 // frontend routes =========================================================
 app.get('*', function(req, res) {
  res.sendfile('./public/login.html');
 });
}