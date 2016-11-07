import usersRepository from '../repositories/usersRepository';

module.exports = {
  getUser: (username, callback) => {
    usersRepository.getUser(username, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result[0]);
      }
    });
  }
};
