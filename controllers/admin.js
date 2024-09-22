const Blogs = require('../models/blogs');

exports.addBlog = (req, res) => {
	const title = req.body.title;
	const content = req.body.content;
	const date = req.body.date;
	const imageUrl = req.body.imageUrl;
	console.log(req.body);
	const blog = new Blogs({ title: title, imageUrl: imageUrl, description: content, date: Date.now() });
	blog.save().then(() => {
		res.redirect('/');
	}).catch((err) => {
		console.log(err);
	});
}

exports.getAddBlog = (req, res) => {
	res.render('admin/add-edit-article');
}

exports.getAdminDashboard = (req, res) => {
	Blogs.find().then((blogs) => {
		res.render('admin/admin-dashboard', { blogs: blogs });
	}).catch((err) => {
		console.log(err);
	});
}

exports.getEditBlog = (req, res, next) => {
	const blogId = req.query.id;
	Blogs.findById(blogId).then((blog) => {
		res.render('admin/edit-article', {
			blog: blog
		})
	}).catch((err) => {

		console.log(err);
	});
}

exports.postEditBlog = (req, res) => {
	const blogId = req.query.id;
	const updatedTitle = req.body.title;
	const updatedDesc = req.body.description;
	const updatedImgUrl = req.body.imageUrl;
	Blogs.findByIdAndUpdate(blogId, {
		title: updatedTitle,
		description: updatedDesc,
		imageUrl: updatedImgUrl
	}).then((blog) => {
		res.redirect('/');
	}).catch((err) => {
		console.log(err);
	});
}

exports.deleteBlog = (req, res) => {
	const blogId = req.body.blogId;
	Blogs.findByIdAndDelete(blogId).then((blog) => {
		res.redirect('/');
	}).catch((err) => {
		console.log(err);

	});
}