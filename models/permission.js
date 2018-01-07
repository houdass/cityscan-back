const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  label: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Permission', PermissionSchema);
