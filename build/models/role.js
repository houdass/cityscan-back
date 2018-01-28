'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var RoleSchema = new Schema({
  label: {
    type: String,
    enum: [_constants.ROLES.ADMIN, _constants.ROLES.CLIENT],
    required: true
  },
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Permission'
  }]
});

module.exports = _mongoose2.default.model('Role', RoleSchema);