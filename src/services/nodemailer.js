const nodemailer = require('nodemailer');
const { DOMAIN } = require('../config') 
const { ADDRESS, PASSWORD, SERVICE} = require('../config').EMAIL

/**
 * Send an simple email
 * @param {String} to - The email address to send the email to.
 * @param {String} subject - The subject of the email.
 * @param {String} text - The text of the email.
 */
const sendEmail = async (to, subject, text) => {
    const transporter = createTransporter();
    const mailOptions = {
		from: ADDRESS,
		to,
		subject,
		html: text,
	}
    await transporter.sendMail(mailOptions);
}

/**
 * Check if a string is a valid email
 * @param {String} email - email to check
 * @returns {Boolean} - True if email is valid, false otherwise
 */
const isValidEmail = (email) => {
	const re = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i
	return re.test(String(email).toLowerCase())
}

/**
 * Create a transporter to send emails
 * @param {String} address - email address
 * @param {String} password - email password
 * @returns {Object} - transporter
 */
const createTransporter = (address, password) => nodemailer.createTransport({
    service: SERVICE,
    auth: {
        user: address || ADDRESS,
        pass: password || PASSWORD,
    },
})

/**
 * Check if the credentials are valid
 * @param {String} address - email address
 * @param {String} password - email password
 */
const isValidCredentials = async (address, password) => await createTransporter(address, password).verify();

module.exports = {
    isValidEmail,
    isValidCredentials,
    createTransporter,
    sendEmail
}