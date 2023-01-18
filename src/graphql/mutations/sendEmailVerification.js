const { GraphQLString, GraphQLNonNull } = require('graphql')
const userController = require('../../controllers/user.controller')
const catchError = require('../../helpers/catchError')

module.exports = {
    type: GraphQLString,
    description: 'Send an email verification to the user.',
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, { email }, { user, body }) => {
        try {
            await userController.sendEmailVerification(user, email)
        } catch (err) {
            catchError(err, body.operationName)
        }
        return 'Email verification sent successfully.'
    },
}
