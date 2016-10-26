const mongoose = require('mongoose');

const Note = require('./note.model');

function retrieveAllNotes(req, res) {
  Note.find({owner: req.user.sub}, function(err, retrievedNotes) {
    if(err) { return res.status(500).json(err); }
    return res.json(retrievedNotes);
  });
}

function retrieveNote(req, res) {
  Note.findById(req.params.noteId, function(err, retrievedNote) {
    if(err) { return res.status(500).json(err); }
    return res.json(retrievedNote);
  });
}

function createNote(req, res) {
  console.log('Received Body:',req.body);
  const newNote = new Note(req.body);
  newNote.owner = req.user.sub;
  newNote.save(function(err, createdNote) {
    if(err) { return res.status(500).json(err); }
    return res.status(201).json(createdNote);
  });
}

function updateNote(req, res) {
  const noteToUpdate = req.body;
  noteToUpdate.owner = req.user.sub;
  Note.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.params.noteId), owner: req.user.sub}, noteToUpdate, {upsert: false, new:true}, function(err, updatedNote) {
    if(err) { return res.status(500).json(err); }
    return res.json(updatedNote);
  });
}

function removeNote(req, res) {
  Note.remove({_id: new mongoose.Types.ObjectId(req.params.noteId), owner: req.user.sub}, function(err) {
    if(err) { return res.status(500).send(); }
    return res.status(200).send();
  });
}

module.exports = {
  retrieveAllNotes: retrieveAllNotes,
  retrieveNote: retrieveNote,
  createNote: createNote,
  updateNote: updateNote,
  removeNote: removeNote
}
