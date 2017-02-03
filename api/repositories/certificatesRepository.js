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
  addCertification: (userId, cert, callback) => {
    const { certification, authority, expiry, image } = cert;
    const query = 'INSERT INTO "certificates" ("userId", "certification", "authority", "expiry", "image") ' +
                  'VALUES ($1, $2, $3, $4, $5);';
    const params = [ userId, certification, authority, expiry, image ];

    dbAdaptor.executeQuery(query, params, callback);
  },

  createTable: createTable,

  getCertifications: (userId, callback) => {
    const query = 'SELECT "certification", "authority", "expiry", "image" ' +
                  'FROM "certificates" ' +
                  'WHERE "userId"=$1;';
    const params = [ userId ];

    dbAdaptor.executeQuery(query, params, callback);
  },

  removeCertification: (userId, certId, callback) => {
    const query = 'DELETE FROM "certificates" ' +
                  'WHERE "id"=$1 AND "userId"=$2;';
    const params = [ certId, userId ];

    dbAdaptor.executeQuery(query, params, callback);
  }
};
