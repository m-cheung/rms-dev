const config = require('../../public/config');
const logger = require('./logger');
const Pool = require('pg-pool');
const url = require('url');

function parseDBUrl() {
  const params = url.parse(config.database);
  const auth = params.auth.split(':');
  return {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };
}

const dbProps = process.env.CONNECTION_STRING ? parseDBUrl() : config.database;
const pool = new Pool(dbProps);

module.exports = {
  executeQuery: (query, params, callback) => {
    pool.connect().then((client)=> {
      client.query(query, params).then((result) => {
        client.release();
        callback(null, result.rows);
      }).catch((err) => {
        client.release();
        callback(err);
      });
    }).catch((err) => {
      logger.logError('DB Adaptor - executeQuery', err);
      callback(err);
    });
  }
};
