/**
 * @file Contains upload routes.
 * @author Manuel Cabral
 * @version 0.0.3
 */

const express = require('express')
const router = express.Router()
const multer = require('multer')
const { TEMP_FOLDER } = require('../config').CLOUDINARY
const {
	uploadAvatar,
	uploadChatImage,
	uploadMessageImage,
} = require('../controllers/uploadController')

/**
 * Uploads a file to the server, then uploads it to cloudinary.
 * NOTE: Only accepts images for now.
 */

router.post(
	'/avatar',
	multer({ dest: TEMP_FOLDER }).single('image'),
	uploadAvatar
)

router.post(
	'/chatavatar/:id',
	multer({ dest: TEMP_FOLDER }).single('image'),
	uploadChatImage
)

router.post(
	'/messageimage/:chatId/:messageId',
	multer({ dest: TEMP_FOLDER }).single('image'),
	uploadMessageImage
)

module.exports = router
