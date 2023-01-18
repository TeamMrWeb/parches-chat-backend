const jwt = require('jsonwebtoken')

module.exports = {
    sign: async (payload, secret, options) =>
        await jwt.sign(payload, secret, options),
    verify: async (token, secret, options) =>
        await jwt.verify(token, secret, options),
    decode: async (token, options) => await jwt.decode(token, options),
}
