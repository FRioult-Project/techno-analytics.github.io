
// define our nerd model
// module.exports allows us to pass this to other files when it is called
//module.exports = connection.model('', {}, '');

var mongoose = require('mongoose');

var TechnoSchema = new mongoose.Schema({
    sha: String,
    "techno":String,
    commit:{
        author: { name: String,
                  email: String,
                  date: Date
        },
        committer: { name: String,
                     email: String,
                     date: Date
        },
        message: String,
       comment_count: Number
    }
});

module.exports = mongoose.model('commit', TechnoSchema);


