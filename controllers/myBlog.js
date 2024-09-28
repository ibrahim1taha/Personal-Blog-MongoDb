const Blogs = require('../models/blogs');
const Users = require('../models/users');

exports.getBlogs = (req, res, next) => {
	Blogs.find().populate('userId').then((blogs) => {
		console.log(blogs);
		res.render('myBlog/home', {
			blogs: blogs,
			authorImage: 'https://i.pinimg.com/736x/80/bd/5c/80bd5c04efbebbab337c19479d52ad5a.jpg',
			author: blogs[0].userId.userName
		});
	}).catch((err) => {
		console.log(err);
	});
}
exports.getArticle = (req, res) => {
	const blogId = req.query.id;
	Blogs.findById(blogId).populate('userId')
		.then((blog) => {
			if (!blog) {
				return res.status(404).send('Article not found');
			}
			res.render('myBlog/article', {
				blog: blog,
				imgUrl: 'https://i.pinimg.com/736x/80/bd/5c/80bd5c04efbebbab337c19479d52ad5a.jpg'
			});
		})
		.catch((err) => {
			console.log(err);
		});
};