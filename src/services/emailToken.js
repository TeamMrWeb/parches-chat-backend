const { EmailToken } = require('../database').models

module.exports = {
    create: async (email, token) => {
        const emailToken = new EmailToken({
            email,
            token,
        })
        await emailToken.save()
    },
    findOne: async (filter) => await EmailToken.findOne(filter),
    remove: async (filter) => await EmailToken.deleteOne(filter),
}
