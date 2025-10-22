const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

// Path to your compiled HTML
const htmlTemplate = fs.readFileSync(
	path.join(__dirname, 'dist', 'email-template.html'),
	'utf8'
)

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'andrezzz2312@gmail.com', // your Gmail
		pass: 'wdlm iisj yzyy xvhw', // 16-char app password
	},
})

;(async () => {
	try {
		const info = await transporter.sendMail({
			from: '"MJML Test" andrezzz2312@gmail.com>',
			to: 'andrezzz2312@gmail.com', // send to yourself first
			subject: 'Test: MJML Email Template',
			html: htmlTemplate,
		})
		console.log('✅ Email sent successfully!')
		console.log('📨 Message ID:', info.messageId)
	} catch (err) {
		console.error('❌ Failed to send email:', err)
	}
})()
