const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));

const myBlogRoutes = require('./routes/myBlog');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

app.use('/', myBlogRoutes);
app.use('/', authRoutes);
app.use('/admin', adminRoutes);

mongoose.connect('mongodb+srv://ibrahim_mohamed:62jrOx1zjhKamDwF@project0.4ly2y.mongodb.net/Blogs').then((result) => {
	app.listen(3000, () => {
		console.log('app running on port 3000 _____________________ ')
	})
}).catch((err) => {
	console.log(err);
});