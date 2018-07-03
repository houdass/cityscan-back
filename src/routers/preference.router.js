require('../config/passport.config');
const preferenceController = require('../controllers/preference.controller')();
const authController = require('../controllers/auth.controller')();
import ROLES from '../constants/role.constants';
import express from 'express';
import passport from 'passport';

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = () => {
  const preferenceRouter = new express.Router();

  preferenceRouter.use(requireAuth, authController.hasAuthorization(ROLES.ADMIN));

  /**
   * @api {post} preferences/ Add preference
   * @apiName addPreference
   * @apiGroup Preference
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
  preferenceRouter.post('/', preferenceController.add);

  /**
   * @api {get} preferences/ Find all preferences
   * @apiName findPreferences
   * @apiGroup Preference
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
  preferenceRouter.get('/', preferenceController.findAll);

  preferenceRouter.use('/:id', preferenceController.middleware);

  /**
   * @api {get} preferences/:id Find preference
   * @apiName findPreference
   * @apiGroup Preference
   * @apiParam {String} id Preference id
   * @apiSuccessExample {json} Success
   * 200 OK
   * {
   *     "_id": "5a576df7e14a8635e3dabe1b",
   *     "label": "WRITE_USERS"
   * }
   */
  preferenceRouter.get('/:id', preferenceController.find);

  /**
   * @api {put} preferences/:id Edit preference
   * @apiName editPreference
   * @apiGroup Preference
   * @apiParam {String} id Preference id
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
  preferenceRouter.put('/:id', preferenceController.edit);

  /**
   * @api {delete} preferences/:id Remove preference
   * @apiName removePreference
   * @apiGroup Preference
   * @apiParam {String} id Preference id
   * @apiSuccessExample {json} Success
   * 204 No Content
   */
  preferenceRouter.delete('/:id', preferenceController.remove);

  return preferenceRouter;
};
