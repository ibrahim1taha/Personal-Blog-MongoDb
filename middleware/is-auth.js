exports.loggedIn = ((req, res, next) => {
	if (!req.session.isLoggedIN) {
		return res.redirect('/login');
	}
	next();
})
exports.isAuthorizated = ((req, res, next) => {
	if (!req.session.isLoggedIN) {
		return res.redirect('/login');
	}
	next();
})