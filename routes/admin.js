const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

const { body } = require('express-validator');


const isAuth = require('../middleware/is-auth');

router.get('/add-blog', isAuth.loggedIn, adminController.getAddBlog);

router.get('/admin-dashboard', isAuth.loggedIn, adminController.getAdminDashboard);

router.post('/add-blog', isAuth.loggedIn, adminController.addBlog);

router.get('/edit-blog', isAuth.loggedIn, adminController.getEditBlog);

router.post('/edit-blog', isAuth.loggedIn, adminController.postEditBlog);

router.post('/delete-blog', isAuth.loggedIn, adminController.deleteBlog)

module.exports = router;


