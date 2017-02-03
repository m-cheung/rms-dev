import usersRepository from '../repositories/usersRepository';

module.exports = {
  getAllUsers: (callback) => {
    usersRepository.getAllUsers((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },

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
