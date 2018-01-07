require('../config/passport');

const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');
const express = require('express');
const passport = require('passport');
const ROLES = require('../constants').ROLES;
const PERMISSIONS = require('../constants').PERMISSIONS;

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = () => {
  const userRoutes = new express.Router();

  /**
   * @api {get} users/ Get all users
   * @apiName GetUsers
   * @apiGroup User
   * @apiSuccessExample {json} Success
   *  200 OK
   *
   [
   {
       "_id": "59581124a425ce0862678112",
       "firstName": "Youness",
       "lastName": "Houdass",
       "email": "youness@gmail.com",
       "role": "client",
       "permissions": [
           "READ_USERS",
           "WRITE_USERS"
       ]
   },
   {
       "_id": "59581131a425ce0862678113",
       "firstName": "John",
       "lastName": "Doe",
       "email": "john@gmail.com",
       "role": "admin",
       "permissions": [
           "READ_USERS",
           "WRITE_USERS"
       ]
   }
   ]
   * @apiErrorExample {json} Register error
   *  400  Bad Request
   */

  userRoutes.get('/', requireAuth,
    AuthController.hasAuthorization(ROLES.ADMIN, PERMISSIONS.READ_USERS),
    UserController.get);


  userRoutes.get('/scan', requireAuth, UserController.scan);

  return userRoutes;
};
