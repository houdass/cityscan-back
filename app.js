// Importing Node modules and initializing Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/main');
const authRouter = require('./routers/authRouter')();
const userRouter = require('./routers/userRouter')();
const roleRouter = require('./routers/roleRouter')();
const permissionRouter = require('./routers/permissionRouter')();

// Database Connection
mongoose.connect(config.database);

if (process.env.ENV === 'test') {
  // TODO
} else {
  mongoose.connect(config.database);

  // Start the server
  app.listen(config.port);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log(`Your server is running on port ${config.port}.`);

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.cors.origin);
  res.header('Access-Control-Allow-Methods', config.cors.methods);
  res.header('Access-Control-Allow-Headers', config.cors.headers);
  res.header('Access-Control-Allow-Credentials', config.cors.credentials);
  next();
});

const apiRoutes = new express.Router();

app.use('/api', apiRoutes);

// Set auth routers as subgroup/middleware to other routers
apiRoutes.use('/auth', authRouter);
apiRoutes.use('/user', userRouter);
apiRoutes.use('/role', roleRouter);
apiRoutes.use('/permission', permissionRouter);

app.use(express.static('public'));
