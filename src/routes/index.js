const express = require('express')
const router = express.Router()

//const uploadRouter = require('./upload')

router.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = router