const shiftsRepository = require('../repositories/shiftsRepository');

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

  getShifts: (callback) => {
    shiftsRepository.getShifts((err, result) => {
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
  }
};
