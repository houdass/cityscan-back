// Importing Node modules and initializing Express
import compression from 'compression';
import express from 'express';
import cors from 'cors';
const app = express();
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import pdf from 'express-pdf';

const MAIN_CONFIG = require('./config/main.config');
const authRouter = require('./routers/auth.router')();
const userRouter = require('./routers/user.router')();
const roleRouter = require('./routers/role.router')();
const permissionRouter = require('./routers/permission.router')();
const cityScanRouter = require('./routers/cityscan.router')();
import i18n from 'i18n';

i18n.configure({
  locales: ['fr', 'en', 'de'],
  directory: `${__dirname}/locales`,
  objectNotation: true
});
app.use(i18n.init);

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
app.use(bodyParser.json({ limit: '50mb' }));

app.use(pdf);

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
