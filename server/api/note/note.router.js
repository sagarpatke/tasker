const Router = require('express').Router();
const auth = require('../auth/auth.controller');

const controller = require('./note.controller');

Router.get('/',auth.verifyAuth, controller.retrieveAllNotes);
Router.get('/:noteId',auth.verifyAuth, controller.retrieveNote);
Router.post('/',auth.verifyAuth, controller.createNote);
Router.put('/:noteId',auth.verifyAuth, controller.updateNote);
Router.delete('/:noteId',auth.verifyAuth, controller.removeNote);

module.exports = Router;
