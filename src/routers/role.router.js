require('../config/passport.config');
const roleController = require('../controllers/role.controller')();
const authController = require('../controllers/auth.controller')();
import ROLES from '../constants/role.constants';
import PERMISSIONS from '../constants/permission.constants';
import express from 'express';
import passport from 'passport';

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = () => {
  const roleRouter = new express.Router();

  roleRouter.use(requireAuth, authController.hasAuthorization(ROLES.ADMIN, PERMISSIONS.READ_USERS));

  /**
   * @api {post} roles/ Add role
   * @apiName addRole
   * @apiGroup Role
   * @apiParamExample  {json} Raw data example
   * {
   *     "label": "ADMIN",
   *     "permissions": [
   *         "5a576ddee14a8635e3dabe0c",
   *         "5a576df7e14a8635e3dabe1b"
   *     ]
   * }
   * @apiSuccessExample {json} Success
   * 201 Created
   *
   * {
   *     "__v": 0,
   *     "label": "ADMIN",
   *     "_id": "5a5b624ff244752b5321572a",
   *     "permissions": [
   *         {
   *             "_id": "5a576ddee14a8635e3dabe0c",
   *             "label": "READ_USERS"
   *         },
   *         {
   *             "_id": "5a576df7e14a8635e3dabe1b",
   *             "label": "WRITE_USERS"
   *         }
   *     ]
   * }
   */
  roleRouter.post('/', roleController.add);

  /**
   * @api {get} roles/ Find all roles
   * @apiName findRoles
   * @apiGroup Role
   * @apiSuccessExample {json} Success
   * 200 OK
   * [
   *  {
   *      "_id": "5a576e0de14a8635e3dabe23",
   *      "label": "ADMIN",
   *      "permissions": [
   *          {
   *              "_id": "5a576ddee14a8635e3dabe0c",
   *              "label": "READ_USERS"
   *          },
   *          {
   *              "_id": "5a576df7e14a8635e3dabe1b",
   *              "label": "WRITE_USERS"
   *          }
   *      ]
   *  },
   *  {
   *      "_id": "5a5a380fffa7560961bd66fd",
   *      "label": "CLIENT",
   *      "__v": 2,
   *      "permissions": []
   *  }
   * ]
   */
  roleRouter.get('/', roleController.findAll);

  // Routes with id middleware.
  roleRouter.use('/:id', roleController.middleware);

  /**
   * @api {get} roles/:id Find role
   * @apiName findRole
   * @apiGroup Role
   * @apiParam {String} id Role id
   * @apiSuccessExample {json} Success
   * 200 OK
   * {
   *     "_id": "5a5b5e287826ecf1aba17e9e",
   *     "label": "ADMIN",
   *     "permissions": [
   *         {
   *             "_id": "5a576ddee14a8635e3dabe0c",
   *             "label": "READ_USERS"
   *         },
   *         {
   *             "_id": "5a576df7e14a8635e3dabe1b",
   *             "label": "WRITE_USERS"
   *         }
   *     ]
   * }
   */
  roleRouter.get('/:id', roleController.find);

  /**
   * @api {put} roles/:id Edit role
   * @apiName editRole
   * @apiGroup Role
   * @apiParam {String} id Role id
   * @apiParamExample  {json} Raw data example
   * {
   *     "label": "MEMBER",
   *     "permissions": [
   *         "5a576ddee14a8635e3dabe0c"
   *     ]
   * }
   * @apiSuccessExample {json} Success
   * 200 OK
   * {
   *     "_id": "5a5a380fffa7560961bd66fd",
   *     "label": "MEMBER",
   *     "__v": 3,
   *     "permissions": [
   *         "5a576ddee14a8635e3dabe0c"
   *     ]
   * }
   */
  roleRouter.put('/:id', roleController.edit);

  /**
   * @api {delete} roles/:id Remove role
   * @apiName removeRole
   * @apiGroup Role
   * @apiParam {String} id Role id
   * @apiSuccessExample {json} Success
   * 204 No Content
   */
  roleRouter.delete('/:id', roleController.remove);

  return roleRouter;
};
