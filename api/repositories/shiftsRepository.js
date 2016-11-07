const dbAdaptor = require('../utils/dbAdaptor');

module.exports = {
  addShift: (shift, callback) => {
    const { name, start, end, type, desc } = shift;
    const query = 'INSERT INTO "shifts" ("name", "start", "end", "type", "description") ' +
                  'VALUES ($1, $2, $3, $4, $5);';
    const params = [ name, start, end, type, desc ];

    dbAdaptor.executeQuery(query, params, callback);
  },

  deleteShift: (shiftId, callback) => {
    const query = 'DELETE FROM "shifts" WHERE "id"=$1;';
    const params = [ shiftId ];

    dbAdaptor.executeQuery(query, params, callback);
  },

  getShifts: (callback) => {
    const query = 'SELECT "id", "name", "start", "end" "type", "primaryId", "secondaryId", "rookieId", "description" ' +
                  'FROM "shifts";';

    dbAdaptor.executeQuery(query, null, callback);
  },

  modifyShift: (shift, callback) => {
    const params = [ shift.id ];
    const total = Object.keys(shift).length;
    let paramCount = 1;
    let query = 'UPDATE "shifts" SET ';

    for (const prop in shift) {
      if (shift.hasOwnProperty(prop) && prop !== 'id') {
        params.push(shift[prop]);
        query += '"' + prop + '"=$' + ++paramCount + (paramCount !== total ? ', ' : ' ');
      }
    }
    query += 'WHERE "id"=$1;';

    dbAdaptor.executeQuery(query, params, callback);
  }
};
