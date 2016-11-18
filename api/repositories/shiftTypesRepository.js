const dbAdaptor = require('../utils/dbAdaptor');

function createTable(callback) {
  const query = 'CREATE TABLE IF NOT EXISTS "shiftTypes" (' +
    '"id" serial NOT NULL,' +
    '"name" character varying(255) NOT NULL,' +
    '"primaryReq" int NOT NULL DEFAULT 0,' +
    '"secondaryReq" int NOT NULL DEFAULT 0,' +
    '"rookieReq" int NOT NULL DEFAULT 0' +
    'CONSTRAINT id_pkey PRIMARY KEY (id)' +
  ');';

  dbAdaptor.executeQuery(query, null, callback);
}

module.exports = {
  createTable: createTable,

  getShiftTypeById: (typeId, callback) => {
    const query = 'SELECT "name", "primaryReq", "secondaryReq", "rookieReq" ' +
                  'FROM "shiftTypes" ' +
                  'WHERE "id"=$1;';
    const params = [ typeId ];

    dbAdaptor.executeQuery(query, params, callback);
  },

  getShiftTypeByName: (typeName, callback) => {
    const query = 'SELECT "name", "primaryReq", "secondaryReq", "rookieReq" ' +
                  'FROM "shiftTypes" ' +
                  'WHERE "name"=$1;';
    const params = [ typeName ];

    dbAdaptor.executeQuery(query, params, callback);
  }
};

