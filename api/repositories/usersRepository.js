const dbAdaptor = require('../utils/dbAdaptor');

function createTable(callback) {
  const query = 'CREATE TABLE IF NOT EXISTS "users" (' +
    '"id" serial NOT NULL,' +
    '"username" character varying(255) NOT NULL,' +
    '"firstName" character varying(255),' +
    '"lastName" character varying(255),' +
    '"active" boolean NOT NULL DEFAULT true,' +
    '"permissions" integer NOT NULL DEFAULT 0, ' +
    '"wantsNotification" boolean NOT NULL DEFAULT false,' +
    '"lastNotified" timestamp with time zone,' +
    '"createdAt" timestamp with time zone NOT NULL,' +
    '"updatedAt" timestamp with time zone NOT NULL,' +
    'CONSTRAINT users_pkey PRIMARY KEY (id),' +
    'CONSTRAINT users_username_key UNIQUE (username)' +
  ');';

  dbAdaptor.executeQuery(query, null, callback);
}


module.exports = {
  createTable: createTable,

  getUser: (username, callback) => {
    const query = 'SELECT "id", "username", "firstName", "lastName", "active", "permissions", "wantsNotification" ' +
                  'FROM "users" WHERE "username"=$1;';
    const params = [ username ];
    dbAdaptor.executeQuery(query, params, callback);
  }
};
