'use strict';

var _constants = require('../constants');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../config/passport');
var permissionController = require('../controllers/permission.controller')();
var authController = require('../controllers/auth.controller')();


// Middleware to require login/auth
var requireAuth = _passport2.default.authenticate('jwt', { session: false });

module.exports = function () {
  var permissionRouter = new _express2.default.Router();

  permissionRouter.use(requireAuth, authController.hasAuthorization(_constants.ROLES.ADMIN));

  /**
   * @api {post} permission/ Add permission
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
   * @api {get} permission/ Find all permissions
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
   * @api {get} permission/:id Find permission
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
   * @api {put} permission/:id Edit permission
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
   * @api {delete} permission/:id Remove permission
   * @apiName removePermission
   * @apiGroup Permission
   * @apiParam {String} id Permission id
   * @apiSuccessExample {json} Success
   * 204 No Content
   */
  permissionRouter.delete('/:id', permissionController.remove);

  return permissionRouter;
};