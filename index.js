// load environment variables
const { config } = require('dotenv');
config();

// required modules
const ws = require('ws');
const app = require('./src/app');
const { PORT } = require('./src/config');
const { createServer } = require('http');
const { useServer } = require('graphql-ws/lib/use/ws')
const { URI } = require('./src/config').DATABASE
const { ADDRESS } = require('./src/config').EMAIL
const { TEMP_FOLDER } = require('./src/config').CLOUDINARY
const { connectDatabase, getDatabaseName } = require('./src/database');
const { createPath, clearPath, existsPath } = require('./src/utils/files');
const { isValidCredentials } = require('./src/services/nodemailer')


const main = async () => {
    // temp folder
    const tmpExists = await existsPath(TEMP_FOLDER);
    if (!tmpExists) await createPath(TEMP_FOLDER);
    else await clearPath(TEMP_FOLDER);
    
    // connect to database
    try{
        await connectDatabase(URI);
        const name = getDatabaseName();
        console.log(`Connected successfully to database: ${name}`);
    } catch (error) {
        console.log('Database connection failed :(');
        throw new Error(error);
    }

    // email service
    try{
        await isValidCredentials();
        console.log(`Email service is ready to use: ${ADDRESS}`);
    } catch (error) {
        console.log('Email service failed :(');
        throw new Error(error);
    }
   
    // start server
    const server = createServer(app);
    const webSocketServer = new ws.Server({ server, path: '/subscriptions' });

    await server.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
    //useServer({ schema: app.get('schema') }, webSocketServer);
}

main()
