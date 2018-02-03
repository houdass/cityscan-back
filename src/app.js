// Importing Node modules and initializing Express
const compression = require('compression');
import express from 'express';
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const MAIN_CONFIG = require('./config/main.config');
const authRouter = require('./routers/auth.router')();
const userRouter = require('./routers/user.router')();
const roleRouter = require('./routers/role.router')();
const permissionRouter = require('./routers/permission.router')();
const cityScanRouter = require('./routers/cityscan.router')();

// Database Connection
mongoose.connect(MAIN_CONFIG.MONGODB_URI);

if (process.env.ENV === 'TEST') {
  // TODO
} else {
  // Database Connection
  mongoose.connect(process.env.MONGODB_URI || MAIN_CONFIG.MONGODB_URI);

  // Start the server
  app.listen(process.env.PORT || MAIN_CONFIG.PORTS.EXPRESS);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

app.use(compression());

// Enable CORS from client-side
app.use(cors());
app.options('*', cors());

const apiRoutes = new express.Router();

app.use('/api', apiRoutes);

// Set auth routers as subgroup/middleware to other routers
apiRoutes.use('/auth', authRouter);
apiRoutes.use('/users', userRouter);
apiRoutes.use('/roles', roleRouter);
apiRoutes.use('/permissions', permissionRouter);
apiRoutes.use('/cityscan', cityScanRouter);

app.use(express.static('public'));
