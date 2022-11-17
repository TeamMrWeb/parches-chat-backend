const { connect, connection }= require('mongoose');

/**
 * Connect to database by a given URI
 * @param {String} uri - database URI 
 * @returns {Promise} - database connection
 */
const connectDatabase = async (uri) => await connect(uri);

/* Disconnect database */
const disconnectDatabase = () => connection.close();

/* Get database connection name */
const getDatabaseName = () => connection.name;

module.exports = {
    connectDatabase,
    disconnectDatabase,
    getDatabaseName,

    models: {
        User: require('./models/user'),
    }
}