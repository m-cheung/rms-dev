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

  getShifts: (getAll, callback) => {
    const query = 'SELECT "id", "name", "start", "end" "type", "primaryId", "secondaryId", "rookieId", "description" ' +
                  'FROM "shifts" ' +
                  'WHERE "end" > CURRENT_TIMESTAMP OR $1;';
    const params = [ getAll ];

    dbAdaptor.executeQuery(query, params, callback);
  },

  getUserShifts: (userId, getAll, callback) => {
    const query = 'SELECT "id", "name", "start", "end" "type", "description" ' +
                  'FROM "shifts" ' +
                  'WHERE ("primaryId"=$1 OR "secondaryId"=$1 OR "rookieId"=$1) ' +
                    'AND ("end" > CURRENT_TIMESTAMP OR $2);';
    const params = [ userId, getAll ];

    dbAdaptor.executeQuery(query, params, callback);
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
