require('../config/passport');

const AuthenticationController = require('../controllers/auth.controller');
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireLogin = passport.authenticate('local', { session: false });

module.exports = () => {
  // Initializing route groups
  const authRoutes = new express.Router();

  /**
   * @api {post} auth/register Registration
   * @apiName Register
   * @apiGroup Auth
   *
   * @apiParamExample {json} Raw data example.
   *
   * {
   *  "email": "john@gmail.com",
   *  "password": "123456",
   *  "firstName": "John",
   *  "lastName": "Doe",
   *  "role": "59872482d44ea90d62fc5011",
   *  "permissions": [
   *    "59873fb56c8ac5274aacafa2",
   *    "59874023f39e4d27afa81d7c"
   *  ]
   * }
   * @apiSuccessExample {json} Success
   *  200 OK
   * {
   * "token": "JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9IiLk ...",
   * "user": {
   *    "_id": "59875f6e837d800369affabb",
   *   "firstName": "Youness",
   *   "lastName": "Houdass",
   *   "email": "youness@gmail.com",
   *   "role": {
   *       "_id": "59872482d44ea90d62fc5011",
   *       "label": "admin",
   *       "__v": 0
   *   },
   *   "permissions": [
   *       {
   *           "_id": "59873fb56c8ac5274aacafa2",
   *           "label": "READ_USERS",
   *           "__v": 0
   *       },
   *       {
   *           "_id": "59874023f39e4d27afa81d7c",
   *           "label": "WRITE_USERS",
   *           "__v": 0
   *       }
   *   ]
   *  }
   * }
   * @apiErrorExample {json} Register error
   *  400  Bad Request
   */

  authRoutes.post('/register', AuthenticationController.register);

  /**
   * @api {post} auth/login Login
   * @apiName Login
   * @apiGroup Auth
   * @apiParamExample {json} Raw data example
   * {
   *  "email": "youness@gmail.com",
   *  "password": "123456"
   * }
   * @apiSuccessExample {json} Success
   *  200 OK
   *  {
   * "token": "JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9IiLk ...",
   * "user": {
   *    "_id": "59875f6e837d800369affabb",
   *   "firstName": "Youness",
   *   "lastName": "Houdass",
   *   "email": "youness@gmail.com",
   *   "role": {
   *       "_id": "59872482d44ea90d62fc5011",
   *       "label": "admin",
   *       "__v": 0
   *   },
   *   "permissions": [
   *       {
   *           "_id": "59873fb56c8ac5274aacafa2",
   *           "label": "READ_USERS",
   *           "__v": 0
   *       },
   *       {
   *           "_id": "59874023f39e4d27afa81d7c",
   *           "label": "WRITE_USERS",
   *           "__v": 0
   *       }
   *   ]
   *  }
   * }
   * @apiErrorExample {json} Register error
   *  400  Bad Request
   */

  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  return authRoutes;
};
