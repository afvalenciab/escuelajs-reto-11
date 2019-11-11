const boom = require('@hapi/boom');

function authValidationHandler(){
  return function (req, res, next) {
    if (!req.user) {
      next(boom.unauthorized('Missing Permission'));
    }
    
    if ( req.user.isAdmin ) {
      return next();
    } else {
      next(boom.unauthorized('Insufficient Permissions'));
    }
  };
}

module.exports = authValidationHandler;
