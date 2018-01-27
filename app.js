// Importing Node modules and initializing Express
const compression = require('compression');
import express from 'express';
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const CONFIG = require('./config/main');
const authRouter = require('./routers/auth.router')();
const userRouter = require('./routers/user.router')();
const roleRouter = require('./routers/role.router')();
const permissionRouter = require('./routers/permission.router')();
const cityScanRouter = require('./routers/cityscan.router')();

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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CONFIG.CORS.origin);
  res.header('Access-Control-Allow-Methods', CONFIG.CORS.methods);
  res.header('Access-Control-Allow-Headers', CONFIG.CORS.headers);
  res.header('Access-Control-Allow-Credentials', CONFIG.CORS.credentials);
  next();
});

const apiRoutes = new express.Router();

app.use('/api', apiRoutes);

// Set auth routers as subgroup/middleware to other routers
apiRoutes.use('/auth', authRouter);
apiRoutes.use('/users', userRouter);
apiRoutes.use('/roles', roleRouter);
apiRoutes.use('/permissions', permissionRouter);
apiRoutes.use('/cityscan', cityScanRouter);

app.use(express.static('public'));
