require('../config/passport');
const userController = require('../controllers/user.controller')();
const authController = require('../controllers/auth.controller')();
import express from 'express';
import passport from 'passport';
import { ROLES } from '../constants';

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = () => {
  const userRouter = new express.Router();

  userRouter.use(requireAuth, authController.hasAuthorization(ROLES.ADMIN));

  /**
   * @api {get} users/ Find all users
   * @apiName findUsers
   * @apiGroup User
   * @apiSuccessExample {json} Success
   * 200 OK
   * [
   *     {
   *         "_id": "5a5160ee18dd6e05a03bf3a2",
   *         "firstName": "Youness",
   *         "lastName": "Houdass",
   *         "email": "youness@gmail.com",
   *         "role": {
   *             "_id": "5a5b5e287826ecf1aba17e9e",
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
   *     },
   *     {
   *         "_id": "5a5b4f2fc654151673c8dea2",
   *         "firstName": "Mouad",
   *         "lastName": "Ennaciri",
   *         "email": "mouad@gmail.com",
   *         "role": {
   *             "_id": "5a5b5e287826ecf1aba17e9e",
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
   * ]
   */
  userRouter.get('/', userController.findAll);
  userRouter.get('/', userController.scan); // TODO

  // Routes with id middleware.
  userRouter.use('/:id', userController.middleware);

  /**
   * @api {get} user/:id Find user
   * @apiName findUser
   * @apiGroup User
   * @apiParam {String} id User id
   * @apiSuccessExample {json} Success
   * 200 OK
   * {
   *     "_id": "5a5160ee18dd6e05a03bf3a2",
   *     "updatedAt": "2017-07-02T23:18:26.347Z",
   *     "createdAt": "2017-07-02T23:18:26.347Z",
   *     "firstName": "Youness",
   *     "lastName": "Houdass",
   *     "email": "youness@gmail.com",
   *     "role": {
   *         "_id": "5a5b5e287826ecf1aba17e9e",
   *         "label": "ADMIN",
   *         "permissions": [
   *             {
   *                 "_id": "5a576ddee14a8635e3dabe0c",
   *                 "label": "READ_USERS"
   *             },
   *             {
   *                 "_id": "5a576df7e14a8635e3dabe1b",
   *                 "label": "WRITE_USERS"
   *             }
   *         ]
   *     }
   * }
   */
  userRouter.get('/:id', userController.find);

  /**
   * @api {put} user/:id Edit user
   * @apiName editUser
   * @apiGroup User
   * @apiParam {String} id User id
   * @apiParamExample  {json} Raw data example
   * {
   *     "firstName": "Youness",
   *     "lastName": "Houdass",
   *     "email": "youness@gmail.com",
   *     "role": "5a5b5e287826ecf1aba17e9e"
   * }
   * @apiSuccessExample {json} Success
   * 200 OK
   * {
   *     "_id": "5a5160ee18dd6e05a03bf3a2",
   *     "updatedAt": "2018-01-14T17:54:48.309Z",
   *     "createdAt": "2017-07-02T23:18:26.347Z",
   *     "firstName": "Youness",
   *     "lastName": "Houdass",
   *     "email": "youness@gmail.com",
   *     "role": {
   *         "_id": "5a5b5e287826ecf1aba17e9e",
   *         "label": "ADMIN",
   *         "permissions": [
   *             {
   *                 "_id": "5a576ddee14a8635e3dabe0c",
   *                 "label": "READ_USERS"
   *             },
   *             {
   *                 "_id": "5a576df7e14a8635e3dabe1b",
   *                 "label": "WRITE_USERS"
   *             }
   *         ]
   *     }
   * }
   */
  userRouter.put('/:id', userController.edit);

  /**
   * @api {delete} user/:id Remove user
   * @apiName removeUser
   * @apiGroup User
   * @apiParam {String} id User id
   * @apiSuccessExample {json} Success
   * 204 No Content
   */
  userRouter.delete('/:id', userController.remove);
  return userRouter;
};
