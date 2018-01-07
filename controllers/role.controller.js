const Role = require('../models/role');

exports.get = (req, res) => {
  Role.find({}, (err, roles) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(roles);
    }
  });
};


// ========================================
// Registration Route
// ========================================
exports.add = function(req, res, next) {
  const label = req.body.label;

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
          label
        });

        role.save((err, roleResponse) => {
          if (err) {
            return next(err);
          }

          res.status(201).json(roleResponse);
        });
      }
    }
  });
};
