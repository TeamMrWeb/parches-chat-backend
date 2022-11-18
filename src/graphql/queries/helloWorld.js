const { GraphQLString } = require("graphql");

module.exports = {
    type: GraphQLString,
    description: "Hello World",
    resolve: () => "Hello World",
};