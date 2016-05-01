var request = require('request');

function loginCallback(req, guid, user) {

  var data = {
    guid: guid,
    userId: user.id,
    userUsername: user.username,
    userRank: user.rank
  };

  request.post(req.session.host + '/login/callback', { formData: data }, function (err, res, body) {

    if (err) {
      sails.log.warn(err);
    }
  });
}

module.exports = {
  loginCallback: loginCallback
};
