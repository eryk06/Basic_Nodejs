const userService = require('./Service')
const mailer = require('nodemailer')

const transporter = mailer.createTransport({
	pool: true,
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // use TLS
	auth: {
		user: 'abc@gmail.com',
		pass: 'asdasd',
	},
})

const login = async (email, password) => {
	try {
		return await userService.login(email, password)
	} catch (error) {
		console.log('🚀 ~ User controller login error:', error)
	}
}

const register = async (email, password) => {
	try {
		return await userService.register(email, password)
	} catch (error) {
		console.log('🚀 ~ User controller register error:', error)
	}
}

const sendMail = async (to, subject, content) => {
	try {
		const mailOptions = {
			from: 'Howl <lamvip06192003@gmail.com>',
			to: to,
			subject: subject,
			html: content,
		}
		await transporter.sendMail(mailOptions)
		return true
	} catch (error) {
		console.log('🚀 ~ User controller send mail error:', error)
	}
	return false
}

module.exports = { login, register, sendMail }
