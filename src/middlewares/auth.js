const { verify } = require('../utils/jwt')
const { SECRET } = require('../config').JWT

module.exports = {
    authContext: async (req, res, next) => {
        try {
            const token = req.headers.auth
            const decoded = await verify(token, SECRET)
            req.user = decoded
            next()
        } catch (err) {
            console.log(
                `Unauthorized access method (${err.message}) to ${req.originalUrl}/${req.body.operationName}`
            )
            next()
        }
    },
}
