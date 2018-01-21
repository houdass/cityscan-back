'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Importing Node modules and initializing Express
var compression = require('compression');

var app = (0, _express2.default)();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var CONFIG = require('./config/main');
var authRouter = require('./routers/auth.router')();
var userRouter = require('./routers/user.router')();
var roleRouter = require('./routers/role.router')();
var permissionRouter = require('./routers/permission.router')();

// Database Connection
mongoose.connect(CONFIG.MONGODB_URI);

if (process.env.ENV === 'test') {
  // TODO
} else {
  // Database Connection
  mongoose.connect(process.env.MONGODB_URI || CONFIG.MONGODB_URI);

  // Start the server
  app.listen(process.env.PORT || CONFIG.PORT);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

app.use(compression());

// Enable CORS from client-side
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', CONFIG.CORS.origin);
  res.header('Access-Control-Allow-Methods', CONFIG.CORS.methods);
  res.header('Access-Control-Allow-Headers', CONFIG.CORS.headers);
  res.header('Access-Control-Allow-Credentials', CONFIG.CORS.credentials);
  next();
});

var apiRoutes = new _express2.default.Router();

app.use('/api', apiRoutes);

// Set auth routers as subgroup/middleware to other routers
apiRoutes.use('/auth', authRouter);
apiRoutes.use('/user', userRouter);
apiRoutes.use('/role', roleRouter);
apiRoutes.use('/permission', permissionRouter);

app.use(_express2.default.static('public'));