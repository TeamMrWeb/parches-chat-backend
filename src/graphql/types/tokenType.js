/**
 * @file Contains token type
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const { GraphQLObjectType, GraphQLString } = require('graphql')

const TokenType = new GraphQLObjectType({
	name: 'TokenType',
	description: 'The token type.',
	fields: {
		accessToken: {
            type: GraphQLString,
            description: 'The access token of the user.',
        },
        refreshToken: {
            type: GraphQLString,
            description: 'The refresh token of the user.',
        },
	},
})

module.exports = TokenType
