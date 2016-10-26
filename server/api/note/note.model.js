const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  owner: { type: String, required: true, index: true },
  title: { type: String },
  text: { type: String }
});

module.exports = mongoose.model('Note',NoteSchema);
