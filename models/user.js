var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name : String,
	email: { type: String, required: true, unique: true },
	g_token: String,
	tasks: Array,
	created_at: Date,
	updated_at: Date
});

// adds created date or updates date when saving
userSchema.pre('save', function(next) {
	var currentDate = new Date()

	this.updated_at = currentDate;

	if(!this.created_at) {
		this.created_at = currentDate;
	}

	next();
});

var User = mongoose.model('user', userSchema);

module.exports = User;


