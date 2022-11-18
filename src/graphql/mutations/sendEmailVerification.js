const { GraphQLString, GraphQLNonNull } = require('graphql')
const userController = require('../../controllers/user.controller')

module.exports = {
    type: GraphQLString,
    description: 'Send an email verification to the user.',
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, { email }, { user }) => {
        if(!user) throw new Error('Unauthorized');
        try {
            await userController.sendEmailVerification(user, email);
        } catch (err) {
            console.log(err);
            throw new Error('An error occurred while sending the email verification.');
        }
        return 'Email verification sent successfully.';
    }
}