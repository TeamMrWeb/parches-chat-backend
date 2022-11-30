/**
 * @file Contains refresh token mutation.
 * @author Manuel Cabral
 * @version 0.0.3
 */

// required modules
const jwt = require('jsonwebtoken')
const { REFRESH_SECRET } = require('../../config').JWT
const { createToken, existRefreshToken } = require('../../utils/auth')
const { TokenType } = require('../types')

// arguments object

const resolve = async (_, args, context) => {
    const { user, refreshToken } = context
    if (!user || !refreshToken) throw new Error('No autorizado.')
    const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_SECRET)
    if (decodedRefreshToken.user.id !== user.id) throw new Error('No autorizado.')
    const refreshTokenDb = await existRefreshToken(user.id)
    if( refreshTokenDb.token !== refreshToken) throw new Error('Refresh token expirado')
    if (!refreshTokenDb) throw new Error('No autorizado.')
    const accessToken = await createToken({
        id: user.id,
        username: user.username,
        email: user.email,
    })
    const newRefreshToken = await createToken({
        id: user.id,
        username: user.username,
        email: user.email,
    }, { useRefresh: true })
    return { accessToken, refreshToken: newRefreshToken }
}

// mutation object
const refreshToken = {
	type: TokenType,
	description: 'Refresh a access token of a logged user.',
	resolve,
}

module.exports = refreshToken
