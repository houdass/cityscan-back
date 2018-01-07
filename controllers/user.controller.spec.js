const sinon = require('sinon');
// should = require('should'),

describe('Book Controller Tests', () => {
    describe('Post', () => {
        it('should not allow an empty title on post', () => {
            const Book = () => {
                this.save = () => {};
            };

            const req = {
                body: {
                    author: 'Youness'
                }
            };

            const res = {
                status: sinon.spy(),
                send: sinon.spy()
            };
            const bookController = require('./bookController')(Book);
            bookController.post(req, res);

            res.status.calledWith(400).should.equal(true,
                `Bad Status ${res.status.args[0][0]}`);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});

