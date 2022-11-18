const { GraphQLSchema } = require('graphql');

module.exports = {
    v1: new GraphQLSchema({
        query: require('./queries'),
        mutation: require('./mutations'),
        //subscription: require("./subscriptions"),
    }),
    v2: null
}