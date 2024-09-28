const { createRequire } = require('module');
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		ref: 'Users',
		required: true
	}
})

module.exports = mongoose.model('Blogs', blogSchema); 