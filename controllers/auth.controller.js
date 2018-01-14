require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/main');
const util = require('../services/util.service');
const _ = require('lodash');

/**
 * Generate token.
 *
 * @param {Object} user - the authenticated user.
 * @return {Object} - token.
 */
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 3600 // in seconds
  });
}

const populateRoleAndPermissions = {
  path: 'role',
  populate: {
    path: 'permissions'
  }
};

const authController = () => {
  // Login
  const login = (req, res, next) => {
    req.user
    .populate({
      path: 'role',
      populate: {
        path: 'permissions'
      }
    }, (err) => {
      if (err) {
        return next(err);
      }
      // Respond with JWT if user was created
      const userInfo = util.setUserInfo(req.user);
      res.status(200).json({
        token: `JWT  ${generateToken(userInfo)}`,
        user: userInfo
      });
      next();
    });
  };

  // Register
  const register = (req, res, next) => {
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const role = req.body.role;

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

    User.findOne({ email }, (err, existingUser) => {
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
      const user = new User({
        email,
        password,
        firstName,
        lastName,
        role
      });

      user.save((err, user) => {
        if (err) {
          return next(err);
        }

        user.populate(populateRoleAndPermissions, (err) => {
          if (err) {
            return next(err);
          }
          // Respond with JWT if user was created
          const userInfo = util.setUserInfo(user);
          res.status(201).json({
            token: `JWT  ${generateToken(userInfo)}`,
            user: userInfo
          });
        });
      });
    });
  };

  // Authorizations Role/Permissions check
  const hasAuthorization = (roles = [], permissions = []) => {
    roles = [].concat([], roles);
    permissions = [].concat([], permissions);
    return (req, res, next) => {
      const user = req.user;

      User.findById(user._id)
      .populate('role')
      .exec((err, foundUser) => {
        if (err) {
          res.status(422).json({ error: 'No user found.' });
          return next(err);
        }

        const foundPermissions = foundUser.role.permissions.map((permission) => permission.label);
        if ((roles.indexOf(foundUser.role.label) > -1)
          || (_.intersection(permissions,
            foundPermissions).length > 0)) {
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
    login,
    hasAuthorization,
    register
  };
};

module.exports = authController;
