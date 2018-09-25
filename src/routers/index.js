const authenticationController = require('./auth')

module.exports = (app) => {
  app.use('/v1/auth', authenticationController);
}