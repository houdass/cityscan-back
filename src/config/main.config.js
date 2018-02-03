export default {
  // Secret key for JWT signing and encryption
  SECRET: 'hiit-cityscan-secret-passphrase',
  EXPIRES_IN: 86400,
  // Database connection information ('mongodb://localhost/cityscan')
  MONGODB_URI: 'mongodb://demo:demo@ds251737.mlab.com:51737/cityscan',
  // Setting port for server
  PORTS: {
    EXPRESS: 8080,
    BROWSER_SYNC: 3000
  },
  ENVS: {
    DEV: 'DEV',
    PROD: 'PROD',
    TEST: 'TEST'
  }
};
