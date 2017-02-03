const config = require('../../public/config');
const jwt = require('jsonwebtoken');

// Authorization Mask (Reserving the upper half for client-side)
const USER_PERMISSION = 1; // 0000 0000 0000 0000 0000 0000 0000 0001

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
        } else if (!(decoded.permissions & USER_PERMISSION)) {
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
