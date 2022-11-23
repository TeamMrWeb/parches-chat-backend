const nodemailer = require('nodemailer');
// const { DOMAIN } = require('../config') 
const { ADDRESS, PASSWORD, SERVICE} = require('../config').EMAIL

module.exports = {
    createTransporter: (address, password) => nodemailer.createTransport({
        service: SERVICE,
        auth: {
            user: address || ADDRESS,
            pass: password || PASSWORD,
        },
    }),
    isValidEmail: (email) => {
        const re = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i
        return re.test(String(email).toLowerCase())
    },
    isValidCredentials: async (address, password) => await module.exports.createTransporter(address, password).verify(),
    sendEmail: async (to, subject, text) => {
        const transporter = module.exports.createTransporter();
        const mailOptions = {
            from: ADDRESS,
            to,
            subject,
            html: text,
        }
        await transporter.sendMail(mailOptions);
    }
}