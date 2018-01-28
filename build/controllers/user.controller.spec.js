'use strict';

var sinon = require('sinon');
// should = require('should'),

describe('Book Controller Tests', function () {
    describe('Post', function () {
        it('should not allow an empty title on post', function () {
            var Book = function Book() {
                undefined.save = function () {};
            };

            var req = {
                body: {
                    author: 'Youness'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };
            var bookController = require('./bookController')(Book);
            bookController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});