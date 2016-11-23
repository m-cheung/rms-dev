const dbAdaptor = require('../utils/dbAdaptor');

function createTable(callback) {
  const query = 'CREATE TABLE IF NOT EXISTS "config" (' +
    '"id" serial NOT NULL,' +
    '"name" character varying(255) NOT NULL,' +
    '"value" character varying(255),' +
    'CONSTRAINT config_pkey PRIMARY KEY (id)' +
  ');';

  dbAdaptor.executeQuery(query, null, callback);
}

module.exports = {
  createTable: createTable
};
