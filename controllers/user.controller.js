const User = require('../models/user');
const util = require('./util.controller');
const Nightmare = require('nightmare');
const nightmare = new Nightmare({ show: true });
const $ = require('jquery');

exports.get = (req, res) => {
  User.find({})
  .populate('role permissions')
  .exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const usersInfo = users.map((user) => util.setUserInfo(user));
      res.json(usersInfo);
    }
  });
};

exports.scan = function(req, res, next) {
  nightmare
  .goto('http://www.seloger.com/')
  .wait(2000)
  .type('.jsInlineContainer input[type="text"]', 'paris')
  .wait(1000)
  .evaluate(() => {
    //$('.jsInlineContainer input[type="text"]').val('paris');
    $('.jsInlineContainer input[type="text"]').focus();

    $('.selectize-dropdown')[0].style.display = 'block';
    console.log('1done');
  })
  .wait(3000)
  .evaluate(() => {
    $('.optionContainer').get(0).click();
    console.log('2done');
  })
  .wait(1000)
  .click('.b-btn.b-warn')
  .wait(3000)
  .evaluate(() => Array.from($('.c-pa-list')).map(element => {
    let el = {}
    el.price = $(element).find('.c-pa-price').text()
    return el
  }))
  .end()
  .then((result) => {
    result.forEach((element) => {
      console.log('=> ', element);
    });
  })
  .catch((error) => {
    console.error('Search failed:', error);
  });
};
