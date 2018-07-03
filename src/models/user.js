import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import Role from './role';
import ROLES from '../constants/role.constants';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: { type: String },
    lastName: { type: String },
    preference: {
      type: Schema.Types.ObjectId,
      ref: 'Preference'
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  {
    timestamps: true
  });

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {
  const user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      if (!user.role) {
        Role.findOne({ label: ROLES.CLIENT }, (err, role) => {
          if (err) {
            return next(err);
          } else {
            user.role = role._id;
            next();
          }
        });
      } else {
        next();
      }
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
