var request = require('request');

function loginCallback(req, guid, token) {
  
  var data = {
    guid: guid,
    token: token
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
