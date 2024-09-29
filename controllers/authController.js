const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const { validationResult } = require('express-validator')
exports.getSignup = (req, res) => {
	let errorMsg = req.flash('error');
	if (errorMsg.length <= 0)
		errorMsg = null;
	res.render('myBlog/signup', {
		errorMessage: errorMsg
	});
}


exports.postSignup = (req, res) => {
	const { userName, imgUrl, email, password } = req.body;
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(422).render('myBlog/signup', {
			errorMessage: error.array({ onlyFirstError: true })[0].msg
		})
	}

	bcrypt.hash(password, 12).then((hashedPass) => {
		const newUser = new Users({
			userName: userName,
			imgUrl: imgUrl,
			email: email,
			password: hashedPass
		})
		return newUser.save().then(result => {
			res.redirect('/login');
		})
	}).catch((err) => {
		console.log(err);
	});
}


exports.getLogin = (req, res) => {
	let errorMsg = req.flash('error');
	if (errorMsg.length <= 0)
		errorMsg = null;
	res.render('myBlog/login', {
		errorMessage: errorMsg
	});
}

exports.postLogin = (req, res) => {
	const { email, password } = req.body;
	Users.findOne({ email: email }).then((user) => {
		if (!user) {
			req.flash('error', 'Email or password is incorrect');
			return res.redirect('/login');
		}
		bcrypt.compare(password, user.password).then(isCorrectPass => {
			if (isCorrectPass) {
				req.session.isLoggedIN = true;
				req.session.user = user;
				return req.session.save(err => {
					if (err) {
						console.log(err);
						req.flash('error', 'Email or password is incorrect');
						return res.redirect('/login');
					}
					res.redirect('/');
				})
			}
			req.flash('error', 'Email or password is incorrect');
			res.redirect('/login');
		})
	}).catch((err) => {
		console.log(err);
	});
}

exports.postLogout = (req, res) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect('/');
	});
}