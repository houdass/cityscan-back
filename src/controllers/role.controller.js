import Role from '../models/role';

const roleController = () => {
  // Add Role
  const add = (req, res, next) => {
    const label = req.body.label;
    const permissions = req.body.permissions ? req.body.permissions : [];

    // Return error if no role label provided
    if (!label) {
      return res.status(422).send({
        error: 'You must enter a role label.'
      });
    }

    Role.findOne({ label }, (err, role) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (role) {
          res.status(422).json({ error: 'This role already exists.' });
        } else {
          const role = new Role({
            label,
            permissions
          });

          role.save((err) => {
            if (err) {
              return next(err);
            }

            role.populate('permissions', (err, doc) => {
              res.status(201).json(doc);
            });
          });
        }
      }
    });
  };

  // Edit Role
  const edit = (req, res) => {
    req.role.label = req.body.label;
    req.role.permissions = req.body.permissions;
    req.role.save((err, roleResponse) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(roleResponse);
      }
    });
  };

  // Find Role
  const find = (req, res) => {
    res.json(req.role);
  };

  // GET Roles
  const findAll = (req, res) => {
    Role.find({})
    .populate('permissions')
    .exec((err, roles) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(roles);
      }
    });
  };

  // Role Middleware
  const middleware = (req, res, next) => {
    Role.findById(req.params.id)
    .populate('permissions')
    .exec((err, role) => {
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
  const remove = (req, res) => {
    req.role.remove((err) => {
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

module.exports = roleController;
