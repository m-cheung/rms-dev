const config = require('../../public/config');
const jwt = require('jsonwebtoken');
const usersRepo = require('../repositories/usersRepository');

export default function login(req) {
  return new Promise((resolve, reject) => {
    const username = req._decoded.username;

    usersRepo.getUser(username, (err, users) => {
      if (err) {
        console.error(err);
        reject('An error was encountered while communicating with the database');
      } else if (users.length !== 1) {
        reject('This user is not registered');
      } else {
        const user = users[0];
        const token = jwt.sign(user, config.signing_key, {
          expiresIn: 60 * 60 * 2 // Expires in 2 hours
        });
        resolve(token); // Client should store the token
      }
    });
  });
}
