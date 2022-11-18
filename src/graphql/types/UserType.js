const { GraphQLObjectType, GraphQLInt, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');
const AvatarType = require('./AvatarType');
const DateTimeType = require('./DateTimeType');

module.exports = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        avatar: { type: AvatarType },
        about: { type: GraphQLString },
        status: { type: GraphQLInt },
        verified: { type: GraphQLBoolean },
        createdAt: { type: DateTimeType },
        updatedAt: { type: DateTimeType },
    }
});