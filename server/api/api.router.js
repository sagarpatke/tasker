const Router = require('express').Router();

Router.use(require('body-parser').json());
Router.use(require('cookie-parser')());

Router.use('/auth',require('./auth/auth.router'));
Router.use('/profile',require('./profile/profile.router'));
Router.use('/note', require('./note/note.router'));

module.exports = Router;


