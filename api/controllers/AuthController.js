/**
 * AuthController
 *
 * @description :: This is merely meant as an example of how your Authentication controller
 *                 should look. It currently includes the minimum amount of functionality for
 *                 the basics of Passport.js to work.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `AuthController.login()`
   *
   * Render the login page
   */
  login: function (req, res) {

    if (!req.param('guid')) {
      return res.json(400, {
        code: 400,
        error: 'Bad request'
      });
    }

    req.session.guid = req.param('guid');

    return res.view({
      data: {
        title: 'Login',
        page: 'login',
        error: req.flash('error')
      }
    });

  },


  /**
   * `AuthController.provider()`
   *
   * Create a third-party authentication endpoint
   */
  provider: function (req, res) {

    passport.endpoint(req, res);
  },



  /**
   * `AuthController.callback()`
   *
   * Create a authentication callback endpoint
   *
   * This endpoint handles everything related to creating and verifying Pass-
   * ports and users, both locally and from third-aprty providers.
   *
   * Passport exposes a login() function on req (also aliased as logIn()) that
   * can be used to establish a login session. When the login operation
   * completes, user will be assigned to req.user.
   *
   * For more information on logging in users in Passport.js, check out:
   * http://passportjs.org/guide/login/
   */
  callback: function (req, res) {

    function tryAgain (err) {

      var flashError = req.flash('error')[0];

      if (err && !flashError)
        req.flash('error', 'Error.Passport.Generic');
      else if (flashError)
        req.flash('error', flashError);

      req.flash('form', req.body);

      var action = req.param('action');

      switch (action) {
        case 'register':
          res.redirect('/login?guid=' + req.session.guid);
          break;

        default:
          res.redirect('/login?guid=' + req.session.guid);
      }
    }

    passport.callback(req, res, function (err, user, challenges) {

      if (err || !user) {
        return tryAgain(challenges);
      }

      req.login(user, function (err) {

        sails.log.warn('Login');

        if (err)
          return tryAgain(err);

        req.session.authenticated = true;

        if (user.tos === true) {
          sails.log.warn('TOS: true');
          AuthenticationService.loginCallback(req.param('guid'), 'MDR'); // TODO: Real token
        }
        else {
          sails.log.warn('TOS: false');
          return res.redirect('/tos');
        }
      });
    });
  }
};
