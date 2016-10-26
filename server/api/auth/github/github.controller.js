const request = require('request');
const async = require('async');
const auth = require('../auth.controller');

const clientId = process.env.GITHUB_CLIENT_ID || '77f0c1f303d2e8c07120';
const clientSecret = process.env.GITHUB_CLIENT_SECRET || 'e78b87862c0fd46e50e351ce0307b4eadca9167c';

const Profile = require('../../profile/profile.model');

function complete(req, res) {
  const code = req.query.code;

  var accessToken;

  async.waterfall([
    function retrieveAccessToken(done) {
      request.post({
        url: 'https://github.com/login/oauth/access_token',
        qs: {
          client_id: clientId,
          client_secret: clientSecret,
          code: code
        },
        headers: {
          "Accept": "application/json"
        }
      }, function(err, response, body) {
        if(err) { return done(err); }
        const accessToken = JSON.parse(body).access_token;
        done(null, accessToken);
      });
    }, function retrieveUserDetails(retrievedAccessToken, done) {
      accessToken = retrievedAccessToken;
      request.get({
        url: 'https://api.github.com/user',
        headers: {
          "User-Agent": "ReactBoilerplate",
          "Accept": "application/vnd.github.v3+json"
        },
        auth: {
          bearer: accessToken
        }
      }, function(err, response, body) {
        if(err) { return done(err); }
        const userProfile = JSON.parse(body);
        done(null, userProfile);
      });
    }, function createOrUpdateUserProfile(user, done) {
      Profile.updateGithubProfile(user, function(err, updatedProfile) {
        if(err) { return done(err); }
        done(null, updatedProfile);
      });
    }, function generateJWTToken(user, done) {
      auth.generateToken(user._id, {name: user.github.name, location: user.github.location}, function(err, token) {
        if(err) { return done(err); }
        done(null,token);
      });
    }
  ], function(err, token) {
    if(err) { return res.status(500).send(err); }
    res.cookie('token',token).redirect('/');
  });
}

function url(req, res) {
  res.send('https://github.com/login/oauth/authorize?client_id='+clientId);
}

module.exports = {
  complete: complete,
  url: url
}
