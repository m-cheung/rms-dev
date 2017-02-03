const async = require('async');
const { RANK } = require('../constants/usersConstants');

const shiftsRepository = require('../repositories/shiftsRepository');
const shiftTypesRepository = require('../repositories/shiftTypesRepository');

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
      // Verify shift start date has not passed
      (shift, cb) => {
        if (new Date(shift.start) < new Date()) {
          cb({ message: 'You cannot take a shift that has already started or past' });
        } else {
          cb(null, shift);
        }
      },
      // Check to see if user already took shift and if user is active
      (shift, cb) => {
        const userId = user.id;

        if (user.active === false) {
          cb({ message: 'You cannot take the shift as you are an inactive member' });
        } else if (shift.primaryId === userId || shift.secondaryId === userId || shift.rookieId === userId) {
          cb({
            statusCode: 409,
            message: 'You are already a responder for this shift'
          });
        } else {
          cb(null, shift);
        }
      },
      // Get information on the type of shift
      (shift, cb) => {
        const type = shift.type;
        async.parallel([
          (innerCb) => { shiftTypesRepository.getShiftTypeById(type, innerCb); },
          (innerCb) => { shiftsRepository.sumUserShifts(user.id, type, innerCb); }
        ], (err, results) => {
          cb(err, shift, results);
        });
      },
      // Verify that the user can take the shift
      (shift, results, cb) => {
        const shiftType = results[0];
        const sumUserShifts = results[1]; // User shifts are reported in seconds

        let criticalTime = new Date(shift.start);
        criticalTime = new Date(criticalTime.getTime() - shiftType.criticalTime * 1000); // 1000 ms in one second

        const isCritical = criticalTime < new Date();
        const userRank = user.rank;

        // Primary: Spot available and user is primary
        if (shift.primaryId === null && userRank === RANK.Primary) {
          const primaryReq = shiftType.primaryReq;

          if ((sumUserShifts < primaryReq) || isCritical) {
            shiftsRepository.setShiftPrimary(shift.id, user.id, cb);
            return;
          }
        }

        // Secondary: Spot available, user is secondary or primary and shift is critical
        if (shift.secondaryId === null && userRank <= RANK.Secondary) {
          const secondaryReq = shiftType.secondaryReq;
          if ((userRank === RANK.Secondary && sumUserShifts < secondaryReq) || isCritical) {
            shiftsRepository.setShiftSecondary(shift.id, user.id, cb);
            return;
          }
        }

        // Rookie: Spot available, user is rookie or shift is critical
        if (shift.rookieId === null) {
          const rookieReq = shiftType.rookieReq;
          if ((userRank === RANK.Rookie && sumUserShifts < rookieReq) || isCritical) {
            shiftsRepository.setShiftRookie(shift.id, user.id, cb);
            return;
          }
        }

        // Final Case: None of the spots are actually available
        cb({ message: 'You are not able to take this shift' });
      }
    ], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: 'Successfully registered for shift' });
      }
    });
  }
};
