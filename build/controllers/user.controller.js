'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _util = require('../services/util.service');

var _nightmare = require('nightmare');

var _nightmare2 = _interopRequireDefault(_nightmare);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nightmare = new _nightmare2.default({ show: true });


var populateRoleAndPermissions = {
  path: 'role',
  populate: {
    path: 'permissions'
  }
};

var userController = function userController() {
  // Add User
  var add = function add(req, res, next) {};

  // Edit User
  var edit = function edit(req, res) {
    req.user.set(req.body);
    req.user.save(function (err, user) {
      if (err) {
        res.status(500).send(err);
      } else {
        user.populate(populateRoleAndPermissions, function (err) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.json((0, _util.setUserInfo)(user));
          }
        });
      }
    });
  };

  // Find User
  var find = function find(req, res) {
    res.json((0, _util.setUserInfo)(req.user));
  };

  // Find User
  var findAll = function findAll(req, res) {
    _user2.default.find({}).populate(populateRoleAndPermissions).exec(function (err, users) {
      if (err) {
        res.status(500).send(err);
      } else {
        var usersInfo = users.map(function (user) {
          return (0, _util.setUserInfo)(user);
        });
        res.json(usersInfo);
      }
    });
  };

  // User Middleware
  var middleware = function middleware(req, res, next) {
    _user2.default.findById(req.params.id).populate(populateRoleAndPermissions).exec(function (err, user) {
      if (err) {
        res.status(500).send(err);
      } else if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).send('No role found');
      }
    });
  };

  // Remove Role
  var remove = function remove(req, res) {
    req.user.remove(function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('Successfully removed');
      }
    });
  };

  var scan = function scan() {
    nightmare.goto('http://www.seloger.com/').wait(2000).type('.jsInlineContainer input[type="text"]', 'paris').wait(1000).evaluate(function () {
      // $('.jsInlineContainer input[type="text"]').val('paris');
      (0, _jquery2.default)('.jsInlineContainer input[type="text"]').focus();

      (0, _jquery2.default)('.selectize-dropdown')[0].style.display = 'block';
      // console.log('1done');
    }).wait(3000).evaluate(function () {
      (0, _jquery2.default)('.optionContainer').get(0).click();
      // console.log('2done');
    }).wait(1000).click('.b-btn.b-warn').wait(3000).evaluate(function () {
      return Array.from((0, _jquery2.default)('.c-pa-list')).map(function (element) {
        var el = {};
        el.price = (0, _jquery2.default)(element).find('.c-pa-price').text();
        return el;
      });
    }).end().then(function (result) {
      result.forEach(function (element) {
        // console.log('=> ', element);
      });
    }).catch(function (error) {
      // console.error('Search failed:', error);
    });
  };

  return {
    add: add,
    edit: edit,
    find: find,
    findAll: findAll,
    middleware: middleware,
    remove: remove,
    scan: scan
  };
};

module.exports = userController;