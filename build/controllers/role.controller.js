'use strict';

var _role2 = require('../models/role');

var _role3 = _interopRequireDefault(_role2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roleController = function roleController() {
  // Add Role
  var add = function add(req, res, next) {
    var label = req.body.label;
    var permissions = req.body.permissions ? req.body.permissions : [];

    // Return error if no role label provided
    if (!label) {
      return res.status(422).send({
        error: 'You must enter a role label.'
      });
    }

    _role3.default.findOne({ label: label }, function (err, role) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (role) {
          res.status(422).json({ error: 'This role already exists.' });
        } else {
          var _role = new _role3.default({
            label: label,
            permissions: permissions
          });

          _role.save(function (err) {
            if (err) {
              return next(err);
            }

            _role.populate('permissions', function (err, doc) {
              res.status(201).json(doc);
            });
          });
        }
      }
    });
  };

  // Edit Role
  var edit = function edit(req, res) {
    req.role.label = req.body.label;
    req.role.permissions = req.body.permissions;
    req.role.save(function (err, roleResponse) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(roleResponse);
      }
    });
  };

  // Find Role
  var find = function find(req, res) {
    res.json(req.role);
  };

  // GET Roles
  var findAll = function findAll(req, res) {
    _role3.default.find({}).populate('permissions').exec(function (err, roles) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(roles);
      }
    });
  };

  // Role Middleware
  var middleware = function middleware(req, res, next) {
    _role3.default.findById(req.params.id).populate('permissions').exec(function (err, role) {
      if (err) {
        res.status(500).send(err);
      } else if (role) {
        req.role = role;
        next();
      } else {
        res.status(404).send('No role found');
      }
    });
  };

  // Remove Role
  var remove = function remove(req, res) {
    req.role.remove(function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('Successfully removed');
      }
    });
  };

  return {
    add: add,
    edit: edit,
    find: find,
    findAll: findAll,
    middleware: middleware,
    remove: remove
  };
};

module.exports = roleController;