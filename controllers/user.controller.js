const User = require('../models/user');
const util = require('../services/util.service');
const Nightmare = require('nightmare');
const nightmare = new Nightmare({ show: true });
const $ = require('jquery');

const populateRoleAndPermissions = {
  path: 'role',
  populate: {
    path: 'permissions'
  }
};

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
        user.populate(populateRoleAndPermissions, (err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.json(util.setUserInfo(user));
          }
        });
      }
    });
  };

  // Find User
  const find = (req, res) => {
    res.json(util.setUserInfo(req.user));
  };

  // Find User
  const findAll = (req, res) => {
    User.find({})
    .populate(populateRoleAndPermissions)
    .exec((err, users) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const usersInfo = users.map((user) => util.setUserInfo(user));
        res.json(usersInfo);
      }
    });
  };

  // User Middleware
  const middleware = (req, res, next) => {
    User.findById(req.params.id)
    .populate(populateRoleAndPermissions)
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

  const scan = () => {
    nightmare
    .goto('http://www.seloger.com/')
    .wait(2000)
    .type('.jsInlineContainer input[type="text"]', 'paris')
    .wait(1000)
    .evaluate(() => {
      // $('.jsInlineContainer input[type="text"]').val('paris');
      $('.jsInlineContainer input[type="text"]').focus();

      $('.selectize-dropdown')[0].style.display = 'block';
      // console.log('1done');
    })
    .wait(3000)
    .evaluate(() => {
      $('.optionContainer').get(0).click();
      // console.log('2done');
    })
    .wait(1000)
    .click('.b-btn.b-warn')
    .wait(3000)
    .evaluate(() => Array.from($('.c-pa-list')).map((element) => {
      const el = {};
      el.price = $(element).find('.c-pa-price').text();
      return el;
    }))
    .end()
    .then((result) => {
      result.forEach((element) => {
        // console.log('=> ', element);
      });
    })
    .catch((error) => {
      // console.error('Search failed:', error);
    });
  };

  return {
    add,
    edit,
    find,
    findAll,
    middleware,
    remove,
    scan
  };
};

module.exports = userController;
