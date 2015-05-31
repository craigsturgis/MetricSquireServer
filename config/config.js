var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    trelloAppKey = process.env.TRELLO_APP_KEY,
    trelloSquireToken = process.env.TRELLO_SQUIRE_TOKEN;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'metricsquireserver'
    },
    port: 3002,
    db: 'postgres://localhost/metricsquireserver-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'metricsquireserver'
    },
    port: 3002,
    db: 'postgres://localhost/metricsquireserver-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'metricsquireserver'
    },
    port: 3002,
    db: 'postgres://localhost/metricsquireserver-production'
  }
};

module.exports = config[env];
