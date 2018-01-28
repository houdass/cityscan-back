'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../config/passport');
var authController = require('../controllers/auth.controller')();


// Middleware to require login/auth
var requireLogin = _passport2.default.authenticate('local', { session: false });

module.exports = function () {
  // Initializing route groups
  var authRouter = new _express2.default.Router();

  /**
   * @api {post} auth/register Registration
   * @apiName Register
   * @apiGroup Auth
   *
   * @apiParamExample { json } Raw data example
   *
   * {
   *     "email": "john@gmail.com",
   *     "password": "123456",
   *     "firstName": "John",
   *     "lastName": "Doe",
   *     "role": "59872482d44ea90d62fc5011"
   * }
   * @apiSuccessExample { json } Success
   * 201 Created
   *
   * {
   *     "token": "JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiVybWlzc2lvbnMiOlsiNWE1NzZkZGVlMTR ...",
   *     "user": {
   *         "_id": "5a5b4d2e311f560d83bc6490",
   *         "firstName": "John",
   *         "lastName": "Doe",
   *         "email": "john@gmail.com",
   *         "role": {
   *             "_id": "5a576e0de14a8635e3dabe23",
   *             "label": "ADMIN",
   *             "permissions": [
   *                 {
   *                     "_id": "5a576ddee14a8635e3dabe0c",
   *                     "label": "READ_USERS"
   *                 },
   *                 {
   *                     "_id": "5a576df7e14a8635e3dabe1b",
   *                     "label": "WRITE_USERS"
   *                 }
   *             ]
   *         }
   *     }
   * }
   */
  authRouter.post('/register', authController.register);

  /**
   * @api {post} auth/login Login
   * @apiName Login
   * @apiGroup Auth
   * @apiParamExample {json} Raw data example
   * {
   *     "email": "youness@gmail.com",
   *     "password": "123456"
   * }
   * @apiSuccessExample {json} Success
   * 200 OK
   * {
   *     "token": "JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVfaWQiOiI1YTUxNjBlZTE4zIiwVuZXNzQGdtYWlsLmNvbSIsInifSx7 ...",
   *     "user": {
   *         "_id": "5a5160ee18dd6e05a03bf3a2",
   *         "firstName": "Youness",
   *         "lastName": "Houdass",
   *         "email": "youness@gmail.com",
   *         "role": {
   *             "_id": "5a576e0de14a8635e3dabe23",
   *             "label": "ADMIN",
   *             "permissions": [
   *                 {
   *                     "_id": "5a576ddee14a8635e3dabe0c",
   *                     "label": "READ_USERS"
   *                 },
   *                 {
   *                     "_id": "5a576df7e14a8635e3dabe1b",
   *                     "label": "WRITE_USERS"
   *                 }
   *             ]
   *         }
   *     }
   * }
   * @apiErrorExample { json } Register error
   * 400 Bad Request
   */
  authRouter.post('/login', requireLogin, authController.login);

  return authRouter;
};