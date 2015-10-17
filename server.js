// modules =================================================
var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var Technos = require('./domain_layer/models/TechnosViews');
// configuration ===========================================
// config files
var db = require('./config/db');

var app = express();
// connect to our mongoDB database (commented out after you enter in your own credentials)
mongoose.connect(db.urlTechnoViews, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app_layer/routes/routes')(app); // pass our application into our routes

//test github api and persistance
var git = require('./app_layer/gateways/githubGateway');
git.getInfos().then(function(i){
    Technos.create(i, function (err, post) {
        if (err) console.log(err);
       console.log(post);
    },function(e){
        console.log(e);
    });

})
exports = module.exports = app; 						// expose app