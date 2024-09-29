const Blogs = require('../models/blogs');
const Users = require('../models/users');

exports.getBlogs = (req, res, next) => {
	let errorMsg = req.flash('error');
	if (errorMsg.length <= 0)
		errorMsg = null;

	Blogs.find().populate('userId').then((blogs) => {
		console.log(blogs);
		res.render('myBlog/home', {
			blogs: blogs,
			errorMessage: errorMsg,
			user: req.user
		});
	}).catch((err) => {
		console.log(err);
	});
}
exports.getArticle = (req, res) => {
	const blogId = req.query.id;
	Blogs.find({ _id: blogId }).populate('userId')
		.then((blog) => {
			console.log(blog);
			if (!blog) {
				return res.status(404).send('Article not found');
			}
			res.render('myBlog/article', {
				blog: blog[0],
				imgUrl: blog[0].userId.imgUrl,
				author: blog[0].userId.userName
			});
		})
		.catch((err) => {
			console.log(err);
		});
};