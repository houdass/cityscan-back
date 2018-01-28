'use strict';

var _permission2 = require('../models/permission');

var _permission3 = _interopRequireDefault(_permission2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var permissionController = function permissionController() {
  // POST Permission
  var add = function add(req, res, next) {
    var label = req.body.label;

    // Return error if no permission label provided
    if (!label) {
      return res.status(422).send({
        error: 'You must enter a permission label.'
      });
    }

    _permission3.default.findOne({ label: label }, function (err, permission) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (permission) {
          res.status(422).json({ error: 'This permission already exists.' });
        } else {
          var _permission = new _permission3.default({
            label: label
          });

          _permission.save(function (err, permissionResponse) {
            if (err) {
              return next(err);
            }

            res.status(201).json(permissionResponse);
          });
        }
      }
    });
  };

  // PUT Permission
  var edit = function edit(req, res) {
    req.permission.label = req.body.label;
    req.permission.save(function (err, permission) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(permission);
      }
    });
  };

  // GET Permission
  var find = function find(req, res) {
    res.json(req.permission);
  };

  // GET Permissions
  var findAll = function findAll(req, res) {
    _permission3.default.find({}, function (err, permissions) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(permissions);
      }
    });
  };

  // Permission Middleware
  var middleware = function middleware(req, res, next) {
    _permission3.default.findById(req.params.id, function (err, permission) {
      if (err) {
        res.status(500).send(err);
      } else if (permission) {
        req.permission = permission;
        next();
      } else {
        res.status(404).send('No permission found');
      }
    });
  };

  // DELETE Permission
  var remove = function remove(req, res) {
    req.permission.remove(function (err) {
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

module.exports = permissionController;