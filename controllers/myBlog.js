const Blogs = require('../models/blogs');

exports.getBlogs = (req, res, next) => {
	Blogs.find().then((blogs) => {
		res.render('myBlog/home', {
			blogs: blogs,
			authorImage: 'https://i.pinimg.com/736x/80/bd/5c/80bd5c04efbebbab337c19479d52ad5a.jpg',
			author: 'Ibrahim taha'
		});
	}).catch((err) => {
		console.log(err);
	});
}
exports.getArticle = (req, res) => {
	const blogId = req.query.id;
	Blogs.findById(blogId)
		.then((blog) => {
			if (!blog) {
				return res.status(404).send('Article not found');
			}
			res.render('myBlog/article', { blog });
		})
		.catch((err) => {
			console.log(err);
		});
};