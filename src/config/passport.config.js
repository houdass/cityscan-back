// Importing Passport, strategies, and config
const passport = require('passport');
const User = require('../models/user');
const MAIN_CONFIG = require('./main.config');
const MONGOOSE = require('../constants/mongoose.constants');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email })
  .populate(MONGOOSE.POPULATE.PREFERENCE)
  .populate(MONGOOSE.POPULATE.ROLE_AND_PERMISSIONS)
  .exec((err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        error: 'Your login details could not be verified. Please try again.'
      });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, {
          error: 'Your login details could not be verified. Please try again.'
        });
      }

      return done(null, user);
    });
  });
});

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: MAIN_CONFIG.SECRET
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload._id)
  .populate(MONGOOSE.POPULATE.PREFERENCE)
  .populate(MONGOOSE.POPULATE.ROLE_AND_PERMISSIONS)
  .exec((err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
