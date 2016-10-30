const async = require('async');
const config = require('../../public/config');
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
  init: (callback) => {
    async.waterfall([
        // TODO: Create tables if they don't exist
        // TODO: Database migrations
    ], callback);
  },

  executeQuery: (query, callback) => {
    pool.connect().then(client => {
      client.query(query).then(result => {
        client.release();
        callback(null, result.rows);
      }).catch(err => {
        client.release();
        callback(err);
      });
    }).catch(err => {
      console.error('Error trying to obtain a client from the pool. Error: ' + err);
      callback(err);
    });
  },

  executeQueryWithParams: (query, params, callback) => {
    pool.connect().then(client => {
      client.query(query, params).then(result => {
        client.release();
        callback(null, result.rows);
      }).catch(err => callback(err));
    }).catch(err => {
      console.error('Error trying to obtain a client from the pool. Error: ' + err);
    });
  }
};
