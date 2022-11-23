const { GraphQLString, GraphQLNonNull } = require('graphql')
const userController = require('../../controllers/user.controller')
const catchError = require('../../helpers/catchError')

module.exports = {
    type: GraphQLString,
    description: 'Verify an email verification.',
    resolve: async (parent, args, { headers, body }) => {
        const token = headers.authorization
        try {
            await userController.verifyEmailVerification(token);
        } catch (err) {
            catchError(err, body.operationName);
        }
        return 'Verified successfully.';
    }
}