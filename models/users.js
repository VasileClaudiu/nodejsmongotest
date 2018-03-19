var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsersSchema   = new Schema({
    username: String,
    email: {type: String, unique: true},
    password: String
});

var Users=mongoose.model('Users', UsersSchema);
module.exports = mongoose.model('Users', UsersSchema);
