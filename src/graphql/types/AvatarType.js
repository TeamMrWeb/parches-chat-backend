const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'AvatarType',
    fields: {
        public_id: { type: GraphQLString },
        secure_url: { type: GraphQLString },
    }
});
