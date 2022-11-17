const userService = require('../services/user');
const emailController = require('../controllers/email.controller');
const { DOMAIN } = require('../config')
const { sign } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { EMAIL_SECRET, EMAIL_EXPIRES_IN, SECRET, EXPIRES_IN } = require('../config').JWT

module.exports = {
    register: async (args) => {
        const hashedPassword = await hashPassword(args.password);
        return userService.createUser({ ...args, password: hashedPassword }, true);
    },

    login: async ({ email, password }) => {
        const user = await userService.findOne({ email }, false);
        if (!user) throw new Error('User not found.');
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials.');
        return user;
    },

    loginWithoutLocalStrategy: async (email, platform) => {
        const user = await userService.findOne({ email, fromPlatform: platform }, false);
        if (!user) throw new Error('User not found.');
        return user;
    },
    tokenize: async (user) => await sign(user, SECRET, { expiresIn: EXPIRES_IN }),

    find: async (filter) => await userService.find(filter),

    findOne: async (filter) => await userService.findOne(filter),

    findById: async (id) => await userService.findById(id),

    sendEmailVerification: async (user, email) => {
        if (email !== user.email) throw new Error('Email does not match.');
        const token = await sign({ id: user.id, email }, EMAIL_SECRET, { expiresIn: EMAIL_EXPIRES_IN });
        const url = `${DOMAIN}/#/accounts/verify/${token}`;
        await emailController.sendVerificationEmail(user.username, url, email);
    }
}
