const { GraphQLNonNull, GraphQLString } = require("graphql");
const userController = require("../../controllers/user.controller");

module.exports = {
    type: GraphQLString,
    description: 'Login a user and returns a token.',
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        authStrategy: { type: GraphQLString, defaultValue: 'local' },
    },
    resolve: async (parent, args, { user }) => {
        if (user) throw new Error('You are already logged in.');
        args.fromPlatform = args.authStrategy;
        delete args.authStrategy;
        let userFound;
        try {
            if (args.fromPlatform === 'google'){
                userFound = await userController.loginWithoutLocalStrategy(args.email, 'google');
            } else {
                userFound = await userController.login(args);
            }
        } catch (err) {
            console.log(err);
            throw new Error('An error occurred while signing.');
        }
        const token = await userController.tokenize({ id: userFound.id, email: userFound.email, username: userFound.username });
        return token;
    }
}