const express = require('express');

const router = express.Router();
const myBlogController = require('../controllers/myBlog');


router.get('/', myBlogController.getBlogs);
router.get('/article', myBlogController.getArticle);

module.exports = router; 
