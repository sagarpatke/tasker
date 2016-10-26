const jwt = require('jsonwebtoken');
const _ = require('lodash');

const secret = '29ntuhaueohtni.c';

function generateToken(sub, info, callback) {
  callback(null, jwt.sign({sub: sub, info: info},secret));
}

function verifyToken(token, callback) {
  jwt.verify(token, secret, callback);
}

function verifyAuth(req, res, next) {
  const token = req.cookies.token;
  verifyToken(token, function(err, claims) {
    if(err) { return res.status(404).send('Not Found'); }
    req.user = claims;
    next();
  });
}

module.exports = {
  generateToken: generateToken,
  verifyAuth: verifyAuth
}
