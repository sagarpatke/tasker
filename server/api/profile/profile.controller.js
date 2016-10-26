const Profile = require('./profile.model')

function retrieveProfile(req, res) {
  const user = req.user;
  Profile.findById(user.sub, function(err, retrievedProfile) {
    return res.json(retrievedProfile);
  });
}

module.exports = {
  retrieveProfile: retrieveProfile
}
