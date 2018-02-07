import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import ROLES from '../constants/role.constants';

const RoleSchema = new Schema({
  label: {
    type: String,
    enum: [ROLES.ADMIN, ROLES.CLIENT],
    required: true
  },
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Permission'
  }]
});

module.exports = mongoose.model('Role', RoleSchema);
