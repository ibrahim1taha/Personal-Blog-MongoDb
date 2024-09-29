const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	userName: {
		type: String,
		required: true
	},
	imgUrl: String,
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Users', userSchema); 