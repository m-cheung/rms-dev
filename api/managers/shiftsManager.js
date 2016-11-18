const async = require('async');
const { CRITICAL_TIME } = require('../constants/applicationConstants');
const { RANK } = require('../constants/usersConstants');

const shiftsRepository = require('../repositories/shiftsRepository');
const shiftTypeRepository = require('../repositories/shiftTypesRepository');

module.exports = {
  addShift: (shift, callback) => {
    shiftsRepository.addShift(shift, (err) => {
      if (err) {
        callback({
          message: 'Unable to add shift to the database',
          error: err
        });
      } else {
        callback(null, { message: 'Operation succeeded' });
      }
    });
  },

  deleteShift: (shiftId, callback) => {
    shiftsRepository.deleteShift(shiftId, (err) => {
      if (err) {
        callback({
          message: 'Unable to delete shift from the database',
          error: err
        });
      } else {
        callback(null, { message: 'Shift was successfully deleted' });
      }
    });
  },

  getShifts: (getAll, callback) => {
    shiftsRepository.getShifts(getAll, (err, result) => {
      if (err) {
        callback({
          message: 'Unable to get shifts from the database',
          error: err
        });
      } else {
        callback(null, result);
      }
    });
  },

  getUserShifts: (userId, getAll, callback) => {
    shiftsRepository.getUserShifts(userId, getAll, (err, result) => {
      if (err) {
        callback({
          message: 'Unable to get shifts for user id ' + userId + ' from the database',
          error: err
        });
      } else {
        callback(null, result);
      }
    });
  },

  modifyShift: (shift, callback) => {
    shiftsRepository.modifyShift(shift, (err) => {
      if (err) {
        callback({
          message: 'Unable to modify the shift',
          error: err
        });
      } else {
        callback(null, { message: 'Shift was successfully updated' });
      }
    });
  },

  takeShift: (shiftId, user, callback) => {
    async.waterfall([
      // Get shift information from database
      (cb) => {
        shiftsRepository.getShift(shiftId, cb);
      },
      // Get information on the type of shift
      (shift, cb) => {
        const type = shift.type;

        shiftTypeRepository.getShiftTypeById(type, (err, shiftType) => {
          cb(err, shift, shiftType);
        });
      },
      // Verify that the user can take the shift
      (shift, shiftType, cb) => {
        const start = new Date(shift.start);
        const criticalTime = new Date();
        criticalTime.setMinutes(criticalTime.getMinutes() - CRITICAL_TIME, criticalTime.getSeconds());

        const isCritical = criticalTime < new Date();
        const userRank = user.rank;

        // Get all of the shift hours of the user...
        // Primary: check and see if primary spot available
        if (userRank === RANK.Primary && shift.primary === null) {
          // const primaryReq = shiftType.primaryReq;
          console.log('INC');
        }


        if (userRank === RANK.Secondary || userRank <= RANK.Secondary && isCritical) {
          console.log('INC');
        }

        // Rookie
        // if {

        // }
        cb(start);
      }



    ], callback);
  }
};
