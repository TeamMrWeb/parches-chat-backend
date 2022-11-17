const { GraphQLList, GraphQLString, GraphQLBoolean } = require('graphql');
const { UserType } = require('../types');
const userController = require('../../controllers/user.controller');

module.exports = {
    type: new GraphQLList(UserType),
    description: 'Get users by username, if no provided, all users verified will be returned.',
    args: {
        username: { type: GraphQLString },
        verified: { type: GraphQLBoolean, defaultValue: true },
    },
    resolve: async (parent, { username, verified }, { user }) => {
        if (!user) throw new Error('Unauthorized');
        if(username) return await userController.find({ username: new RegExp(username, 'i'), verified });
        else return await userController.find({ verified });
    }
}