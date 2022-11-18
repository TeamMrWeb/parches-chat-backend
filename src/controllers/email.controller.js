const { sendEmail } = require('../services/nodemailer');
const ejs = require('ejs');
const path = require('path');

module.exports = {
    sendVerificationEmail: async (username, link, email) => {
        const template = path.join(__dirname, '../views/verifyEmail.ejs');
        const html = await ejs.renderFile(template, { username, link, subject: 'Verificación de email' });
        await sendEmail(email, 'Verificación de email', html);
    }
}