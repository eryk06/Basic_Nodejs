var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../../components/user/Controller');
const { checkRegister } = require('../../middle/Validation');

// http://localhost:3000/api/users
/* GET users listing. */
// http://localhost:3000/api/users/login
router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await userController.login(email, password);

		if (user) {
			// tạo token
			const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' });
			return res.status(200).json({ result: true, user, token });
		} else {
			return res.status(400).json({ result: false, user: null });
		}
	} catch (error) {
		return res.status(500).json({ result: false, user: null });
	}
});

// http://localhost:3000/api/users/register
router.post('/register', [checkRegister], async (req, res, next) => {
	try {
		try {
			const { email, password } = req.body;
			const user = await userController.register(email, password);

			if (user) {
				res.status(200).json({ result: true, user });
			} else {
				res.status(400).json({ result: false, user: null });
			}
		} catch (error) {
			res.status(500).json({ result: false, user: null });
		}
	} catch (error) {
		res.status(500).json({ result: false, user: null });
	}
});

// Gửi email
// http://localhost:3000/api/users/sendmail
router.post('/sendmail', async (req, res, next) => {
	try {
		const { to, subject } = req.body;
		const content = `
		<h1>Chào mừng bạn đến với ứng dụng của chúng tôi</h1>
		<p>Chúng tôi rất vui khi được phục vụ bạn</p>
		`;
		const result = await userController.sendMail(to, subject, content);
		return res.status(200).json({ result });
	} catch (error) {
		console.log('🚀 ~ User send mail error:', error);
		return res.status(500).json({ result: false });
	}
});

module.exports = router;
