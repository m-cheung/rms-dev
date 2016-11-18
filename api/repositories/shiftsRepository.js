const dbAdaptor = require('../utils/dbAdaptor');

function createTable(callback) {
  const query = 'CREATE TABLE IF NOT EXISTS "shifts" (' +
    '"id" serial NOT NULL,' +
    '"name" character varying(255) NOT NULL,' +
    '"start" timestamp with time zone NOT NULL,' +
    '"end" timestamp with time zone NOT NULL,' +
    '"type" integer,' +
    '"primaryId" integer,' +
    '"secondaryId" integer,' +
    '"rookieId" integer,' +
    '"description" text,' +
    '"createdAt" timestamp with time zone NOT NULL DEFAULT now(),' +
    '"updatedAt" timestamp with time zone NOT NULL DEFAULT now(),' +
    'CONSTRAINT shifts_pkey PRIMARY KEY (id),' +
    'CONSTRAINT "primaryCheck" FOREIGN KEY ("primaryId") ' +
      'REFERENCES "users" (id) MATCH SIMPLE ' +
      'ON UPDATE NO ACTION ' +
      'ON DELETE NO ACTION,' +
    'CONSTRAINT "rookieCheck" FOREIGN KEY ("rookieId") ' +
      'REFERENCES "users" (id) MATCH SIMPLE ' +
      'ON UPDATE NO ACTION ' +
      'ON DELETE NO ACTION,' +
    'CONSTRAINT "secondaryCheck" FOREIGN KEY ("secondaryId") ' +
      'REFERENCES "users" (id) MATCH SIMPLE ' +
      'ON UPDATE NO ACTION ' +
      'ON DELETE NO ACTION,' +
    'CONSTRAINT "timeCheck" CHECK ("start" < "end")' +
  ');';

  dbAdaptor.executeQuery(query, null, callback);
}

module.exports = {
  addShift: (shift, callback) => {
    const { name, start, end, type, desc } = shift;
    const query = 'INSERT INTO "shifts" ("name", "start", "end", "type", "description") ' +
                  'VALUES ($1, $2, $3, $4, $5);';
    const params = [ name, start, end, type, desc ];

    dbAdaptor.executeQuery(query, params, callback);
  },

  createTable: createTable,

  deleteShift: (shiftId, callback) => {
    const query = 'DELETE FROM "shifts" WHERE "id"=$1;';
    const params = [ shiftId ];

    dbAdaptor.executeQuery(query, params, callback);
  },

  getShift: (shiftId, callback) => {
    const query = 'SELECT "id", "name", "start", "end", "type", "primaryId", "secondaryId", "rookieId", "description" ' +
                  'FROM "shifts" ' +
                  'WHERE "id"=$1;';
    const params = [ shiftId ];

    dbAdaptor.executeQuery(query, params, callback);
  },

  getShifts: (getAll, callback) => {
    const query = 'SELECT ' +
                  'sh."id", ' +
                  'sh."name", ' +
                  'sh."start", ' +
                  'sh."end", ' +
                  'sh."type", ' +
                  'p."firstName" || \' \' || p."lastName" AS "primary", ' +
                  's."firstName" || \' \' || s."lastName" AS "secondary", ' +
                  'r."firstName" || \' \' || r."lastName" AS "rookie", ' +
                  'sh."description" ' +
                'FROM "shifts" sh ' +
                'LEFT JOIN "users" p ON p."id" = sh."primaryId" ' +
                'LEFT JOIN "users" s ON s."id" = sh."secondaryId" ' +
                'LEFT JOIN "users" r ON r."id" = sh."rookieId" ' +
                'WHERE "end" > CURRENT_TIMESTAMP OR $1 ' +
                'ORDER BY sh."start", sh."name";';
    const params = [ getAll ];

    dbAdaptor.executeQuery(query, params, callback);
  },

  getUserShifts: (userId, getAll, callback) => {
    const query = 'SELECT "id", "name", "start", "end", "type", "description" ' +
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
