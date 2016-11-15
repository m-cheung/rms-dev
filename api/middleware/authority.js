const config = require('../../public/config');
const jwt = require('jsonwebtoken');

module.exports = {
  // Using the user from the database, write properties in token
  loginCheck: (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = (authorization !== undefined) ? authorization.split(' ') : null;

    if (!token || token[0] !== 'Bearer') {
      res.status(403).send({ message: 'Client has not properly authenticated through CAS' });
      next(new Error('Unauthenticated'));
    } else {
      jwt.verify(token[1], config.signing_key, (err, decoded) => {
        if (err) {
          res.status(403).send({ message: 'Invalid token was provided' });
          next(new Error('Invalid token'));
        } else {
          req._decoded = decoded;
          next();
        }
      });
    }
  },

  userCheck: (req, res, next) => {
    const token = req.headers.authorization.split(' ');

    if (!token || token[0] !== 'Bearer') {
      res.status(403).send({ message: 'Client has not properly authenticated through CAS' });
      next(new Error('Unauthenticated'));
    } else {
      jwt.verify(token[1], config.signing_key, (err, decoded) => {
        if (err) {
          res.status(403).send({ message: 'Invalid token was provided' });
          next(new Error('Invalid token'));
        } else if (decoded.permissions !== 'user') {
          res.status(403).send({ message: 'Insufficient privillages' });
        } else {
          req._decoded = decoded;
          next();
        }
      });
    }
  },

  adminCheck: (req, res, next) => {
    next();
  }
};
