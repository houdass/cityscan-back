require('../config/passport.config');
const cityscanController = require('../controllers/cityscan.controller')();
const authController = require('../controllers/auth.controller')();
import express from 'express';
import passport from 'passport';
import ROLES from '../constants/role.constants';

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = () => {
  const cityscanRouter = new express.Router();

  cityscanRouter.use(requireAuth, authController.hasAuthorization(ROLES.ADMIN));

  /**
   * @api {get} cityscan/ Get Places
   * @apiName getAddresses
   * @apiGroup CityScan
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
  cityscanRouter.get('/places', cityscanController.getPlaces);

  /**
   * @api {get} cityScan/ Analyze
   * @apiName Analyze
   * @apiGroup CityScan
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
  cityscanRouter.post('/analyze', cityscanController.analyze);
  return cityscanRouter;
};
