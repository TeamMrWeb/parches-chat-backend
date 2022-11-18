const { GraphQLObjectType } = require("graphql");

module.exports = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type, used to fetch data to the client.',
    fields: {
        helloWorld: require('./helloWorld'),
        user: require('./user'),
        users: require('./users'),
    },
});
