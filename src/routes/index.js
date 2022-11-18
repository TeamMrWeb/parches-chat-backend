const express = require('express')
const router = express.Router()

//const uploadRouter = require('./upload')

router.get('/', (req, res) => {
    res.send('Welcome to parches-chat-2 API from backend')
})

module.exports = router