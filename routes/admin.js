const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-blog', adminController.getAddBlog);

router.get('/admin-dashboard', adminController.getAdminDashboard);

router.post('/add-blog', adminController.addBlog);

router.get('/edit-blog', adminController.getEditBlog);

router.post('/edit-blog', adminController.postEditBlog);

router.post('/delete-blog', adminController.deleteBlog)

module.exports = router;


