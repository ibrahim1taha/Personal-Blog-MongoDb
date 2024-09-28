const bcrypt = require('bcryptjs');
const Users = require('../models/users');

exports.getSignup = (req, res) => {
	res.render('myBlog/signup');
}

exports.getLogin = (req, res) => {
	res.render('myBlog/login');
}


exports.postSignup = (req, res) => {
	const { userName, email, password } = req.body;

	Users.findOne({ email: email }).then((user) => {
		if (!user) {
			return bcrypt.hash(password, 12).then((hashedPass) => {
				const newUser = new Users({
					userName: userName,
					email: email,
					password: hashedPass
				})
				return newUser.save();
			})
		}
	}).then(result => {
		res.redirect('/login');
	}).catch((err) => {
		console.log(err);
	});
}