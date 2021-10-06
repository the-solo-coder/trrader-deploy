let express = require('express')
let router = express.Router()

// middleware
let auth = require('../middleware/auth')

let userController = require('../controllers/users')

/* Get Profile by Id using req.query.id */
router.get('/getProfile', userController.getProfileById)

/* Delete Profile by Id using req.query.id */
router.delete('/deleteProfile', userController.deleteProfileById)

// @route POST /api/user/signin
// @desc Auth User
// @access Public
router.post('/signin', userController.signin)

// @route POST /api/user/register
// @desc Register User
// @access Public
router.post('/signup', userController.signup)

/* PATCH Route to update an Profile in the Database. */
router.post('/update-profile', userController.updateProfile)

module.exports = router
