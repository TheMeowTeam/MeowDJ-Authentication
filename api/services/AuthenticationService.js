var request = require('request');

function generateID() {

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function loginCallback(req, guid, user) {

  var data = {
    guid: guid,
    userId: user.id,
    userUsername: user.username,
    userRank: user.rank,
    transactionID: generateID()
  };

  request.post(req.session.host + '/login/callback', { formData: data }, function (err, res, body) {

    if (err) {
      sails.log.warn(err);
    }
  });
}

module.exports = {
  loginCallback: loginCallback,
  generateID: generateID
};
