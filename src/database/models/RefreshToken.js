/**
 * @file Contains refresh token model.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { Schema, model } = require('mongoose')
const { REFRESH_EXPIRES_IN } = require('../../config').JWT

const refreshTokenSchema = new Schema(
	{
        token: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
			type: Date,
			expires: REFRESH_EXPIRES_IN,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
)

module.exports = model('RefreshToken', refreshTokenSchema)
