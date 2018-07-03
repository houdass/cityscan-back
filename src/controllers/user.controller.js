import User from '../models/user';
import MONGOOSE from '../constants/mongoose.constants';
import { setUserInfo } from '../helpers/util.helper';

const userController = () => {
  // Add User
  const add = (req, res, next) => {
  };

  // Edit User
  const edit = (req, res) => {
    req.user.set(req.body);
    req.user.save((err, user) => {
      if (err) {
        res.status(500).send(err);
      } else {
        user.populate(MONGOOSE.POPULATE.ROLE_AND_PERMISSIONS, (err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.json(setUserInfo(user));
          }
        });
      }
    });
  };

  // Find User
  const find = (req, res) => {
    res.json(setUserInfo(req.user));
  };

  // Find User
  const findAll = (req, res) => {
    User.find({})
    .populate(MONGOOSE.POPULATE.PREFERENCE)
    .populate(MONGOOSE.POPULATE.ROLE_AND_PERMISSIONS)
    .exec((err, users) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const usersInfo = users.map((user) => setUserInfo(user));
        res.json(usersInfo);
      }
    });
  };

  // User Middleware
  const middleware = (req, res, next) => {
    User.findById(req.params.id)
    .populate(MONGOOSE.POPULATE.PREFERENCE)
    .populate(MONGOOSE.POPULATE.ROLE_AND_PERMISSIONS)
    .exec((err, user) => {
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
  const remove = (req, res) => {
    req.user.remove((err) => {
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

module.exports = userController;
