const { Schema, model } = require('mongoose')
const { EMAIL_EXPIRES_IN } = require('../../config').JWT

const emailTokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i,
                'Please a valid email address',
            ],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: EMAIL_EXPIRES_IN,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
)

module.exports = model('EmailToken', emailTokenSchema)
