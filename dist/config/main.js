'use strict';

module.exports = {
  // Secret key for JWT signing and encryption
  SECRET: 'hiit-cityscan-secret-passphrase',
  // Database connection information ('mongodb://localhost/cityscan')
  MONGODB_URI: 'mongodb://demo:demo@ds251737.mlab.com:51737/cityscan',
  // Setting port for server
  PORT: process.env.PORT || 5050,
  PORT_BROWSER_SYNC: 3000,
  PORT_NODEMON: 8000,
  CORS: {
    origin: '*',
    methods: 'PUT, GET, POST, DELETE, OPTIONS',
    headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
    credentials: 'true'
  }
};