require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'RMS',
    description: 'University of Waterloo\'s Campus Response Team Shift Scheduling System',
    head: {
      titleTemplate: 'RMS | %s',
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'React Redux Example'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'React Redux Example'},
        {property: 'og:description', content: 'All the modern best practices in one example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },
  cas: {
    base_url: process.env.CAS_URL || 'https://cas.uwaterloo.ca/cas',
    version: process.env.CAS_VERSION || 2.0
  },
  database: process.env.CONNECTION_STRING || {
    user: process.env.DATABASE_USER || 'developer',
    password: process.env.DATABASE_PASSWORD || 'developer',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE_NAME || 'rms',
    ssl: process.env.DATABASE_SECURE || false
  },
  signing_key: process.env.SIGNING_KEY || 'developer',
}, environment);
