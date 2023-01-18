const userService = require('../services/user')
const emailController = require('../controllers/email.controller')
const errorObject = require('../helpers/error')
const { DOMAIN } = require('../config')
const { sign, verify } = require('../utils/jwt')
const { hashPassword, comparePassword } = require('../utils/bcrypt')
const { EMAIL_SECRET, EMAIL_EXPIRES_IN, SECRET, EXPIRES_IN } =
    require('../config').JWT

module.exports = {
    register: async (args) => {
        const hashedPassword = await hashPassword(args.password)
        return userService.createUser(
            { ...args, password: hashedPassword },
            true
        )
    },

    login: async ({ email, password }) => {
        const user = await userService.findOne({ email }, false)
        if (!user) throw new errorObject('User not found.')
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) throw new errorObject('Invalid credentials.', false)
        return user
    },

    loginWithoutLocalStrategy: async (email, platform) => {
        const user = await userService.findOne(
            { email, fromPlatform: platform },
            false
        )
        if (!user) throw new errorObject('User not found.')
        return user
    },
    tokenize: async (user) =>
        await sign(user, SECRET, { expiresIn: EXPIRES_IN }),

    find: async (filter) => await userService.find(filter),

    findOne: async (filter) => await userService.findOne(filter),

    findById: async (id) => await userService.findById(id),

    sendEmailVerification: async (user, email) => {
        const userDb = await userService.findOne({ email })
        if (!userDb) throw new errorObject('User not found.', false)
        if (userDb.verified)
            throw new errorObject('User already verified.', false)
        if (email !== user.email) throw new Error('Email does not match.')
        const exists = await emailController.findOneEmailToken({ email })
        if (exists) throw new Error('Email already sent.')
        const token = await sign({ id: user.id, email }, EMAIL_SECRET, {
            expiresIn: EMAIL_EXPIRES_IN,
        })
        const url = `${DOMAIN}/#/accounts/verify/${token}`
        await emailController.sendVerificationEmail(user.username, url, email)
        await emailController.createEmailToken(email, token)
    },

    verifyEmailVerification: async (token) => {
        const { id, email } = await verify(token, EMAIL_SECRET)
        const user = await userService.findById(id)
        const exists = await emailController.findOneEmailToken({ email })
        if (!user || !exists) throw new errorObject('Invalid token.')
        if (email !== user.email) throw new errorObject('Email does not match.')
        if (user.verified) throw new errorObject('User already verified.')
        await userService.updateOne({ _id: id }, { verified: true })
        await emailController.removeEmailToken({ email })
    },
}
