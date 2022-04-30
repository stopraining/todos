var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')
const authenticatedHandlers = require('../handlers/checkAuth')
const passport = require('passport')


//user page =>/users
router.get('/', authenticatedHandlers.authenticated, userController.home)

//login&out 
router.get('/login', authenticatedHandlers.isauthenticated, userController.login)
router.get('/logout', userController.logout)

//register
router.get('/register', userController.register)
router.post('/register', userController.registerUser)

// auth
router.post('/auth', userController.auth,
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)





module.exports = router;
