exports.loggedIn = ((req, res, next) => {
	if (!req.session.isLoggedIN) {
		return res.redirect('/login');
	}
	next();
})