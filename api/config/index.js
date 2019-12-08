// Loading environment specific config file
const env = process.env.NODE_ENV || 'development';
const config = require(`./env/${env}`); // eslint-disable-line import/no-dynamic-require

module.exports = config;