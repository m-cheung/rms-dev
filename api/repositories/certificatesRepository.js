const dbAdaptor = require('../utils/dbAdaptor');

function createTable(callback) {
  const query = 'CREATE TABLE IF NOT EXISTS "certificates" (' +
    '"id" serial NOT NULL, ' +
    '"userId" integer NOT NULL, ' +
    '"certification" character varying NOT NULL, ' +
    '"authority" character varying(255) NOT NULL, ' +
    '"expiry" timestamp with time zone NOT NULL, ' +
    '"image" bytea, ' +
    'CONSTRAINT "certificates_pkey" PRIMARY KEY ("id"), ' +
    'CONSTRAINT "userCheck" FOREIGN KEY ("userId") ' +
    	'REFERENCES "users" (id) MATCH SIMPLE ' +
    	'ON UPDATE NO ACTION ' +
    	'ON DELETE CASCADE, ' +
    'CONSTRAINT "expiryCheck" CHECK ("expiry" > now())' +
  ');';

  dbAdaptor.executeQuery(query, null, callback);
}

module.exports = {
  createTable: createTable
};
