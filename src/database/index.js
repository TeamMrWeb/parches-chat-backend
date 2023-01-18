const { connect, connection } = require('mongoose')

module.exports = {
    connectDatabase: async (uri) => await connect(uri),
    disconnectDatabase: () => connection.close(),
    getDatabaseName: () => connection.name,

    models: {
        User: require('./models/user'),
        EmailToken: require('./models/emailToken'),
    },
}
