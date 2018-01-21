import Permission from '../models/permission';

const permissionController = () => {
  // POST Permission
  const add = (req, res, next) => {
    const label = req.body.label;

    // Return error if no permission label provided
    if (!label) {
      return res.status(422).send({
        error: 'You must enter a permission label.'
      });
    }

    Permission.findOne({ label }, (err, permission) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (permission) {
          res.status(422).json({ error: 'This permission already exists.' });
        } else {
          const permission = new Permission({
            label
          });

          permission.save((err, permissionResponse) => {
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
  const edit = (req, res) => {
    req.permission.label = req.body.label;
    req.permission.save((err, permission) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(permission);
      }
    });
  };

  // GET Permission
  const find = (req, res) => {
    res.json(req.permission);
  };

  // GET Permissions
  const findAll = (req, res) => {
    Permission.find({}, (err, permissions) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(permissions);
      }
    });
  };

  // Permission Middleware
  const middleware = (req, res, next) => {
    Permission.findById(req.params.id, (err, permission) => {
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
  const remove = (req, res) => {
    req.permission.remove((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('Successfully removed');
      }
    });
  };

  return {
    add,
    edit,
    find,
    findAll,
    middleware,
    remove
  };
};

module.exports = permissionController;
