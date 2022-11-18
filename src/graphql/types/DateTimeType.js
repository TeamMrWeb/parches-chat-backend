const { GraphQLScalarType } = require('graphql');

module.exports = new GraphQLScalarType({
    name: 'DateTimeType',
    description: 'Date custom scalar type',
    parseValue: value => new Date(value),
    serialize: value => value.toISOString(),
})