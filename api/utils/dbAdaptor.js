// The following will get moved into config.js later
const async = require('async');
const Pool = require('pg-pool');

// const params = url.parse(process.env.DATABASE_URL);
// const auth = params.auth.split(':');

const config = {
  user: 'developer',
  password: 'developer',
  host: 'localhost',
  port: 5432,
  database: 'rms',
  ssl: false
};
const pool = new Pool(config);

module.exports = {
  init: function(callback) {
    async.waterfall([
        // TODO: Create tables if they don't exist
        // TODO: Database migrations
    ], callback);
  },

  executeQuery: function(query, callback) {
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

  executeQueryWithParams: function(query, params, callback) {
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
