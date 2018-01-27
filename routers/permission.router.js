require('../config/passport');
const permissionController = require('../controllers/permission.controller')();
const authController = require('../controllers/auth.controller')();
import { ROLES } from '../constants';
import express from 'express';
import passport from 'passport';

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = () => {
  const permissionRouter = new express.Router();

  permissionRouter.use(requireAuth, authController.hasAuthorization(ROLES.ADMIN));

  /**
   * @api {post} permissions/ Add permission
   * @apiName addPermission
   * @apiGroup Permission
   * @apiParamExample  {json} Raw data example
   * {
   *     "label": "READ_USERS"
   * }
   * @apiSuccessExample {json} Success
   * 201 Created
   * {
   *     "__v": 0,
   *     "label": "READ_USERS",
   *     "_id": "5a5b8ac9821831204787ab83"
   * }
   */
  permissionRouter.post('/', permissionController.add);

  /**
   * @api {get} permissions/ Find all permissions
   * @apiName findPermissions
   * @apiGroup Permission
   * @apiSuccessExample {json} Success
   * 200 OK
   * [
   *     {
   *         "_id": "5a576ddee14a8635e3dabe0c",
   *         "label": "READ_USERS"
   *     },
   *     {
   *         "_id": "5a576df7e14a8635e3dabe1b",
   *         "label": "WRITE_USERS"
   *     }
   * ]
   */
  permissionRouter.get('/', permissionController.findAll);

  permissionRouter.use('/:id', permissionController.middleware);

  /**
   * @api {get} permissions/:id Find permission
   * @apiName findPermission
   * @apiGroup Permission
   * @apiParam {String} id Permission id
   * @apiSuccessExample {json} Success
   * 200 OK
   * {
   *     "_id": "5a576df7e14a8635e3dabe1b",
   *     "label": "WRITE_USERS"
   * }
   */
  permissionRouter.get('/:id', permissionController.find);

  /**
   * @api {put} permissions/:id Edit permission
   * @apiName editPermission
   * @apiGroup Permission
   * @apiParam {String} id Permission id
   * @apiParamExample  {json} Raw data example
   * {
   *     "label": "WRITE_USERS"
   * }
   * @apiSuccessExample {json} Success
   * 200 OK
   * {
   *     "label": "WRITE_USERS"
   * }
   */
  permissionRouter.put('/:id', permissionController.edit);

  /**
   * @api {delete} permissions/:id Remove permission
   * @apiName removePermission
   * @apiGroup Permission
   * @apiParam {String} id Permission id
   * @apiSuccessExample {json} Success
   * 204 No Content
   */
  permissionRouter.delete('/:id', permissionController.remove);

  return permissionRouter;
};
