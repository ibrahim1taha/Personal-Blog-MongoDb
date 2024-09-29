const Blogs = require('../models/blogs');

exports.addBlog = (req, res) => {
	const title = req.body.title;
	const content = req.body.content;
	const date = req.body.date;
	const imageUrl = req.body.imageUrl;
	const blog = new Blogs({ title: title, imageUrl: imageUrl, description: content, date: Date.now(), userId: req.user._id });
	blog.save().then(() => {
		res.redirect('/');
	}).catch((err) => {
		console.log(err);
	});
}

exports.getAddBlog = (req, res) => {
	res.render('admin/add-edit-article', {
		user: req.user
	});
}

exports.getAdminDashboard = (req, res) => {
	let errorMsg = req.flash('error');
	if (errorMsg.length <= 0)
		errorMsg = null;
	Blogs.find({ userId: req.user._id }).populate('userId').then((blogs) => {
		res.render('admin/admin-dashboard', {
			blogs: blogs,
			user: req.user,
			errorMessage: errorMsg
		});
	}).catch((err) => {
		console.log(err);
	});
}

exports.getEditBlog = (req, res, next) => {
	const blogId = req.query.id;
	console.log(req.query.id);
	Blogs.find({ _id: blogId, userId: req.user._id }).then((blog) => {
		console.log(blog);
		if (blog.length <= 0) {
			req.flash('error', 'You do not authorized to edit this blog !!');
			return res.redirect('/admin/admin-dashboard');
		}
		res.render('admin/edit-article', {
			blog: blog[0],
			user: req.user
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
	Blogs.findByIdAndDelete({ _id: blogId, userId: req.user._id }).then((blog) => {
		if (blog.length <= 0) {
			req.flash('error', 'You do not authorized to edit this blog !!');
			return res.redirect('/admin/admin-dashboard');
		}
		res.redirect('/');
	}).catch((err) => {
		console.log(err);

	});
}