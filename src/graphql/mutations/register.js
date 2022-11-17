const { GraphQLNonNull, GraphQLString } = require('graphql');
const userController = require('../../controllers/user.controller');

module.exports = {
    type: GraphQLString,
    description: 'Register a new user in the system.',
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        authStrategy: { type: GraphQLString, defaultValue: 'local' },
    },
    resolve: async (parent, args, { user }) => {
        if (user) throw new Error('You are already logged in.');
        const exists = await userController.findOne({ email: args.email });
        if (exists) throw new Error('User already exists.');
        args.fromPlatform = args.authStrategy;
        delete args.authStrategy;
        try{
            await userController.register(args);
        } catch (err) {
            console.log(err);
            throw new Error('An error occurred while registering the user.');
        }
        return 'User registered successfully. Please verify your email.';
    }
}