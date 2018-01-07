const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ROLES = require('../constants').ROLES;

const RoleSchema = new Schema({
  label: {
    type: String,
    enum: [ROLES.ADMIN, ROLES.CLIENT],
    required: true
  }
});

module.exports = mongoose.model('Role', RoleSchema);
