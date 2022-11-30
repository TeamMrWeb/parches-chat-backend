/**
 * @file Contains all JWT related functions.
 * @author Manuel Cabral
 * @version 0.0.7
 */

// required modules
const jwt = require('jsonwebtoken')
const { Token, RefreshToken } = require('../database').models
const { 
    SECRET, 
    EXPIRES_IN, 
    REFRESH_SECRET, 
    REFRESH_EXPIRES_IN, 
    EMAIL_SECRET, 
    EMAIL_EXPIRES_IN
    } = require('../config').JWT

/**
 * Creates a new JWT token from a payload.
 * @param {Object} user - User object.
 * @param {Object} options - Options object.
 * @param {Boolean} options.useEmail - If true, uses the email secret and saves the token in the database.
 * @returns {String} JWT token
 */
const createToken = async (user, options) => {
	const { useEmail, useRefresh } = options || {}
    let secret, expiresIn
    if (useRefresh)
        secret = REFRESH_SECRET
    else if (useEmail)
        secret = EMAIL_SECRET
    else
        secret = SECRET
    if (useRefresh)
        expiresIn = REFRESH_EXPIRES_IN
    else if (useEmail)
        expiresIn = EMAIL_EXPIRES_IN
    else
        expiresIn = EXPIRES_IN
	const token = jwt.sign({ user }, secret, { expiresIn })
	if (useEmail) {
		const newToken = new Token({ token, email: user.email })
		await newToken.save()
	}
    if (useRefresh) {
        await RefreshToken.findOneAndDelete({ user: user.id })
        const newToken = new RefreshToken({ token, user: user.id })
        await newToken.save()
    }
	return token
}

/**
 * Verifies a JWT token.
 * @param {String} token - JWT token.
 * @param {Object} options - Options object.
 * @param {Boolean} options.useEmail - If true, uses the email secret.
 * @returns {Object} - Decoded token.
 */
const verifyToken = async (token, options) => {
	const { useEmail, useRefresh } = options || {}
    let secret
    if (useRefresh)
        secret = REFRESH_SECRET
    else if (useEmail)
        secret = EMAIL_SECRET
    else
        secret = SECRET
	const decoded = jwt.verify(token, secret)
	if (!decoded) throw new Error('Invalid token')
	if (useEmail) {
		const dbToken = await Token.findOne({ token })
		if (!dbToken) throw new Error('Email token expired')
	}
    if (useRefresh) {
        const dbToken = await RefreshToken.findOne({ token })
        if (!dbToken) throw new Error('Refresh token expired')
    }
	return decoded.user
}

/**
 * Finds a token by email.
 * @param {String} email - Email to check.
 * @returns {Object} - Token object.
 */
const existsEmailToken = async (email) => await Token.findOne({ email })

/**
 * Finds a refresh token by user id.
 * @param {String} userId - User id to find.
 * @returns {Object} - Refresh token object.
 */
const existRefreshToken = async (userId) => await RefreshToken.findOne({ user: userId })

/**
 * Find a token.
 * @param {String} token - Token to find.
 * @returns {Object} - Token object.
 */
const findToken = async (token) => await Token.findOne({ token })

module.exports = {
	createToken,
	verifyToken,
	existsEmailToken,
    existRefreshToken,
    findToken,
}
