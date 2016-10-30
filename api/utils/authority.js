const config = require('../../public/config');
const jwt = require('jsonwebtoken');


module.exports = {
  // Using the user from the database, write properties in token
  generateToken: (user) => {
    return jwt.sign(user, config.signing_key, {
      expiresIn: 60 * 60 * 24 // Expires in 24 hours
    });
  },

  verifyToken: (token) => {
    throw new Error('Unimplemented function. Token: ' + token);
  }
};
