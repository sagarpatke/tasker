const Router = require('express').Router();

Router.use('/github',require('./github/github.router'));

module.exports = Router;
