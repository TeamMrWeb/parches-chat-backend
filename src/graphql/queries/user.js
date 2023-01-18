const { GraphQLID, GraphQLString } = require('graphql')
const { UserType } = require('../types')
const userController = require('../../controllers/user.controller')

module.exports = {
    type: UserType,
    description:
        'Get user by id or username, if no provided, return current logged user.',
    args: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
    },
    resolve: async (parent, { id, username }, { user }) => {
        if (!user) throw new Error('Unauthorized')
        if (id) return await userController.findById(id)
        if (username) return await userController.findOne({ username })
        return userController.findById(user.id)
    },
}
