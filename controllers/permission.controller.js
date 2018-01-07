const Permission = require('../models/permission');

exports.get = (req, res) => {
  Permission.find({}, (err, permissions) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(permissions);
    }
  });
};

exports.add = function(req, res, next) {
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
