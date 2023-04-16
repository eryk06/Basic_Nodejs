const checkRegister = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			status: false,
			message: 'Tất cả các trường đều là bắt buộc',
		});
	} else {
		let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
		if (!regex.test(email)) {
			return res.status(400).json({
				status: false,
				message: 'Email không đúng định dạng',
			});
		}
		regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
		if (!regex.test(password)) {
			return res.status(400).json({
				status: false,
				message:
					'Mật khẩu phải có ít nhất 8 ký tự, chữ hoa, chữ thường, số và ký tự đặc biệt',
			});
		}
		// if (password !== confirm_password) {
		// 	return res.status(400).json({
		// 		status: false,
		// 		message: 'Mật khẩu không khớp',
		// 	});
		// }
	}

	return next();
};

module.exports = { checkRegister };
