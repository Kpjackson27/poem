'use strict';

var poems = require('../controllers/poems');

// poem authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.poem.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Poems, app, auth) {

  app.route('/api/poems')
    .get(poems.all)
    .post(auth.requiresLogin, poems.create);
  app.route('/api/poems/:poemId')
    .get(auth.isMongoId, poems.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, poems.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, poems.destroy);

  // Finish with setting up the poemId param
  app.param('poemId', poems.poem);
};
