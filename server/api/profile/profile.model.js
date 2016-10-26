const mongoose = require('mongoose');

const GithubSchema = new mongoose.Schema({
  login: {type: String, required: true, unique: true},
  id: {type: String, required: true, unique: true},
  avatar_url: {type: String},
  name: {type: String},
  company: {type: String},
  location: {type: String},
  updated_at: {type: Date}
});

const ProfileSchema = new mongoose.Schema({
  name: {type: String},
  github: {type: GithubSchema, required: true},
  location: {type: String}
});

ProfileSchema.statics.updateGithubProfile = function(github, callback) {
  const updatedGithubProfile = {
    name: github.name,
    location: github.location,
    github: github
  }

  this.findOneAndUpdate({'github.login': github.login},updatedGithubProfile, {upsert: true, new: true},callback);
}

module.exports = mongoose.model('Profile',ProfileSchema);
