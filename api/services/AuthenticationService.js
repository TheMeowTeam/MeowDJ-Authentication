var http = require('http');

function loginCallback(guid, token) {
  var data = {
    guid: guid,
    token: token
  };

  var options = {
    host: 'localhost',
    port: '1337',
    path: '/login/callback',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  };

  var request = http.request(options, function (response) {

    // TODO: Close the popup
  });

  request.write('post=' + data + '&is=specified&like=this');
  request.end();
}

module.exports = {
  loginCallback: loginCallback
};
