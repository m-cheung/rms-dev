import configRepository from '../repositories/configRepository';
import shiftsRepository from '../repositories/shiftsRepository';
import shiftTypesRepository from '../repositories/shiftTypesRepository';
import usersRepository from '../repositories/usersRepository';
import async from 'async';

module.exports = {
  initDB: (callback) => {
    async.waterfall([
      (cb) => {
        configRepository.createTable(cb);
      },
      (results, cb) => {
        shiftTypesRepository.createTable(cb);
      },
      (results, cb) => {
        usersRepository.createTable(cb);
      },
      (results, cb) => {
        shiftsRepository.createTable(cb);
      }
    ], (err) => {
      if (err) {
        console.error('ERROR Unable to initialize database. Error: ' + err);
      } else {
        console.info('Database initialization has completed');
        callback(null);
      }
    });
  }
};
