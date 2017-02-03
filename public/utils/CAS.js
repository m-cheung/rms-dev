const CAS = require('cas');
const config = require('../config');

const cas = new CAS({
  base_url: config.cas.base_url,
  service: config.host + ':' + config.port + '/login',
  version: config.cas.version
});

module.exports = cas;
