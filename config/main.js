module.exports = {
  // Secret key for JWT signing and encryption
  secret: 'hiit-cityscan-secret-passphrase',
  // Database connection information
  database: 'mongodb://localhost/cityscan',
  // Setting port for server
  port: process.env.PORT || 3030,
  portBrowserSync: 3000,
  portNodemon: 8000,
  cors: {
    origin: '*',
    methods: 'PUT, GET, POST, DELETE, OPTIONS',
    headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
    credentials: 'true'
  }
};
