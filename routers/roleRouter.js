require('../config/passport');

const RoleController = require('../controllers/role.controller');
const AuthController = require('../controllers/auth.controller');
const ROLES = require('../constants').ROLES;
const PERMISSIONS = require('../constants').PERMISSIONS;
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = () => {
  const roleRoutes = new express.Router();

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

  roleRoutes.get('/', requireAuth,
    AuthController.hasAuthorization(ROLES.ADMIN, PERMISSIONS.READ_USERS),
    RoleController.get);

  roleRoutes.post('/', requireAuth,
    AuthController.hasAuthorization(ROLES.ADMIN, PERMISSIONS.READ_USERS),
    RoleController.add);

  return roleRoutes;
};
