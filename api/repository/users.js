const dbAdaptor = require('../utils/dbAdaptor');

module.exports = {
  getUser: (username, callback) => {
    const query = 'SELECT "id", "username", "first_name", "last_name", "active", "wants_notification" ' +
              'FROM "users" WHERE "username"=$1;';
    const params = [ username ];
    dbAdaptor.executeQueryWithParams(query, params, callback);
  }
};
