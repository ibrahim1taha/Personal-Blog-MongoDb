const bcrypt = require('bcryptjs');
const Users = require('../models/users');

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

	Users.findOne({ email: email }).then((user) => {
		if (user) {
			req.flash('error', 'This email already exits !');
			return res.redirect('/signup');
		}
		else if (!user) {
			return bcrypt.hash(password, 12).then((hashedPass) => {
				const newUser = new Users({
					userName: userName,
					imgUrl: imgUrl,
					email: email,
					password: hashedPass
				})
				return newUser.save().then(result => {
					res.redirect('/login');
				})
			})
		}
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