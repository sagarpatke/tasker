const Router = require('express').Router();
const auth = require('../auth/auth.controller');

const controller = require('./profile.controller');

Router.get('/me', auth.verifyAuth, controller.retrieveProfile);

module.exports = Router;
