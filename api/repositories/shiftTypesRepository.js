const dbAdaptor = require('../utils/dbAdaptor');

function createTable(callback) {
  const query = 'CREATE TABLE IF NOT EXISTS "shiftTypes" (' +
    '"id" serial NOT NULL,' +
    '"name" character varying(255) NOT NULL,' +
    '"primaryReq" int DEFAULT 0,' +
    '"secondaryReq" int DEFAULT 0,' +
    '"rookieReq" int DEFAULT 0,' +
    '"criticalTime" integer NOT NULL, ' +
    '"ignoreCerts" boolean NOT NULL DEFAULT false,' +
    'CONSTRAINT "shiftTypes_pkey" PRIMARY KEY ("id")' +
  ');';

  dbAdaptor.executeQuery(query, null, callback);
}

module.exports = {
  createTable: createTable,

  getShiftTypeById: (typeId, callback) => {
    const query = 'SELECT "name", "primaryReq", "secondaryReq", "rookieReq", "criticalTime", "ignoreCerts" ' +
                  'FROM "shiftTypes" ' +
                  'WHERE "id"=$1;';
    const params = [ typeId ];

    dbAdaptor.executeQuery(query, params, (err, result) => {
      callback(err, result[0]);
    });
  },

  getShiftTypeByName: (typeName, callback) => {
    const query = 'SELECT "name", "primaryReq", "secondaryReq", "rookieReq", "criticalTime", "ignoreCerts" ' +
                  'FROM "shiftTypes" ' +
                  'WHERE "name"=$1;';
    const params = [ typeName ];

    dbAdaptor.executeQuery(query, params, (err, result) => {
      callback(err, result[0]);
    });
  }
};

