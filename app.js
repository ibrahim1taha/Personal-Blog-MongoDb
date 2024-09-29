const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Users = require('./models/users');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const flash = require('connect-flash');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));

const URI = 'mongodb+srv://ibrahim_mohamed:62jrOx1zjhKamDwF@project0.4ly2y.mongodb.net/Blogs';

const store = new MongoDBStore({
	uri: URI,
	collection: 'Sessions',
})

app.use(
	session({
		secret: 'key secret',
		cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day 
		store: store,
		resave: false,
		saveUninitialized: false,
	})
);

const myBlogRoutes = require('./routes/myBlog');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

app.use(flash());

app.use((req, res, next) => {
	if (!req.session.user)
		return next();
	Users.findById(req.session.user._id).then((user) => {
		req.user = user;
		next();
	}).catch((err) => {
		console.log(err);
	});
})

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIN;
	next();
})

app.use('/', myBlogRoutes);
app.use('/', authRoutes);
app.use('/admin', adminRoutes);



mongoose.connect(URI).then((result) => {
	app.listen(3000, () => {
		console.log('app running on port 3000 _____________________ ')
	})
}).catch((err) => {
	console.log(err);
});