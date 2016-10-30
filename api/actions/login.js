const config = require('../../public/config');
const CAS = require('cas');
const cas = new CAS(config.cas);
const authority = require('../utils/authority');
const usersRepo = require('../repository/users');

export default function login(req, res) {
  return new Promise((resolve, reject) => {
    cas.authenticate(req, res, (error, status, username) => {
      if (error) {
        reject(error);
      } else {
        usersRepo.getUser(username, (err, users) => {
          if (err) {
            reject('An error was encountered while communicating with the database');
          } else if (users.length !== 1) {
            reject('This user is not registered on RMS');
          } else {
            const user = users[0];
            const token = authority.generateToken(user);
            resolve({ user, token });
          }
        });
      }
    });
  });
}
