const { GraphQLObjectType } = require("graphql");

module.exports = new GraphQLObjectType({
    name: 'MutationType',
    description: 'The root mutation type, used to create, update, and delete data.',
    fields: {
        register: require('./register'),
        login: require('./login'),
        sendEmailVerification: require('./sendEmailVerification'),
        verifyEmailVerification: require('./verifyEmailVerification'),
    },
});
