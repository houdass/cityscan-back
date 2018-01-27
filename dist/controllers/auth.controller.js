'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _main = require('../config/main');

var _main2 = _interopRequireDefault(_main);

var _util = require('../services/util.service');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('crypto');


/**
 * Generate token.
 *
 * @param {Object} user - the authenticated user.
 * @return {Object} - token.
 */
function generateToken(user) {
  return _jsonwebtoken2.default.sign(user, _main2.default.SECRET, {
    expiresIn: 3600 // in seconds
  });
}

var populateRoleAndPermissions = {
  path: 'role',
  populate: {
    path: 'permissions'
  }
};

var authController = function authController() {
  // Login
  var login = function login(req, res, next) {
    req.user.populate({
      path: 'role',
      populate: {
        path: 'permissions'
      }
    }, function (err) {
      if (err) {
        return next(err);
      }
      // Respond with JWT if user was created
      var userInfo = (0, _util.setUserInfo)(req.user);
      res.status(200).json({
        token: 'JWT  ' + generateToken(userInfo),
        user: userInfo
      });
      next();
    });
  };

  // Register
  var register = function register(req, res, next) {
    // Check for registration errors
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var role = req.body.role;

    // Return error if no email provided
    if (!email) {
      return res.status(422).send({
        error: 'You must enter an email address.'
      });
    }

    // Return error if full name not provided
    if (!firstName || !lastName) {
      return res.status(422).send({
        error: 'You must enter your full name.'
      });
    }

    // Return error if no password provided
    if (!password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }

    _user2.default.findOne({ email: email }, function (err, existingUser) {
      if (err) {
        return next(err);
      }
      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({
          error: 'That email address is already in use.'
        });
      }

      // If email is unique and password was provided, create account
      var user = new _user2.default({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role
      });

      user.save(function (err, user) {
        if (err) {
          return next(err);
        }

        user.populate(populateRoleAndPermissions, function (err) {
          if (err) {
            return next(err);
          }
          // Respond with JWT if user was created
          var userInfo = (0, _util.setUserInfo)(user);
          res.status(201).json({
            token: 'JWT  ' + generateToken(userInfo),
            user: userInfo
          });
        });
      });
    });
  };

  // Authorizations Role/Permissions check
  var hasAuthorization = function hasAuthorization() {
    var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var permissions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    roles = [].concat([], roles);
    permissions = [].concat([], permissions);
    return function (req, res, next) {
      var user = req.user;

      _user2.default.findById(user._id).populate('role').exec(function (err, foundUser) {
        if (err) {
          res.status(422).json({ error: 'No user found.' });
          return next(err);
        }

        var foundPermissions = foundUser.role.permissions.map(function (permission) {
          return permission.label;
        });
        if (roles.indexOf(foundUser.role.label) > -1 || (0, _lodash.intersection)(permissions, foundPermissions).length > 0) {
          return next();
        }

        res.status(401).json({
          error: 'You are not authorized to view this content'
        });
        return next('Unauthorized');
      });
    };
  };

  return {
    login: login,
    hasAuthorization: hasAuthorization,
    register: register
  };
};

module.exports = authController;