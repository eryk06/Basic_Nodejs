const userModel = require('./Model');
const bcrypt = require('bcryptjs');
const AppConstants = require('../../constants/AppConstants');
// Kiểm tra email có trong database nếu có kiểm tra password, nếu password đúng trả về thông tin user, nếu password sai thì trả về null
const login = async (email, password) => {
	try {
		let user = await userModel.findOne({ email });
		if (user) {
			const isMatch = bcrypt.compareSync(password, user.password);
			return isMatch ? user : false;
		}
	} catch (error) {
		console.log('🚀 ~ User service login error: ', error);
	}
	return false;
};

const register = async (email, password) => {
	try {
		let user = await userModel.findOne({ email });
		if (!user) {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);
			await userModel.create({
				email: email,
				password: hash,
			});
			return true;
		}
	} catch (error) {
		console.log('🚀 ~ User service register error: ', error);
	}
	return false;
};

module.exports = { login, register };

var data = [
	{ _id: 1, email: 'lam@gmail.com', password: '1', name: 'Lâm' },
	{ _id: 2, email: 'huy@gmail.com', password: '2', name: 'Huy' },
	{ _id: 3, email: 'long@gmail.com', password: '3', name: 'Long' },
];
