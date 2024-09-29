const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

const authController = require('../controllers/authController');

const Users = require('../models/users');

router.get('/signup', authController.getSignup);

router.post('/signup', [
	body('email', 'Email already exits !').isEmail().normalizeEmail().custom((val, { req }) => {
		return Users.findOne({ email: val }).then((user) => {
			if (user) {
				console.log(user);
				return Promise.reject('Email already exits .!');
			}
		})
	}),
	body('password', 'Password must be at least 4 characters long and contain at least one letter and one number.!').isLength({ min: 4 }).matches(/^(?=.*[a-z])(?=.*[0-9]).*$/)
], authController.postSignup);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout)


module.exports = router; 