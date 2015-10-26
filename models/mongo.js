var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/mintask_test');

var MongoSchema = mongoose.Schema;
var userSchema = new MongoSchema({
	"user_email" : String,
	"user_password" : String
});

module.exports = mongoose.model('user', userSchema);