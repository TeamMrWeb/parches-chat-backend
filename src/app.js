// required modules
const path = require('path');
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const compression = require('compression')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const cookieParser = require('cookie-parser')
const { v1 } = require('./graphql/schemas')
const { authContext } = require('./middlewares/auth')

// setting up express
const app = express()
const logger = morgan('dev')

// import index routes
const indexRouter = require('./routes/index')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(process.cwd(), 'public')))

// middlewares
if (process.env.NODE_ENV.trim() === 'development') app.use(logger)
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
//app.use(authenticate)

// routes
app.use('/', indexRouter)
app.use('/graphql', authContext, graphqlHTTP({
		schema: v1,
		graphiql: {
			subscriptionEndpoint: `ws://localhost:4000/subscriptions`,
			websocketClient: 'v1',
		},
	})
)


module.exports = app