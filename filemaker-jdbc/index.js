'use strict';

// FileMaker JDBC
// -------
var _        = require('lodash');
var inherits = require('inherits');

var Client  = require('../../client');
var Promise = require('../../promise');

var pg;

// Always initialize with the "QueryBuilder" and "QueryCompiler"
// objects, which extend the base 'lib/query/builder' and
// 'lib/query/compiler', respectively.
function Client_FMJDBC(config) {
  Client.apply(this, arguments);
  if (config.returning) this.defaultReturning = config.returning;
  if (config.debug) this.isDebugging = true;
  if (config.connection) {
    this.initDriver();
    this.initRunner();
    this.connectionSettings = config.connection;
    this.initPool();
    this.pool = new this.Pool(config.pool);
  }
}
inherits(Client_FMJDBC, Client);

Client_FMJDBC.prototype.dialect = 'fmjdbc';

// Lazy load the pg dependency, since we might just be using
// the client to generate SQL strings.
Client_FMJDBC.prototype.initDriver = function() {
  jdbc = jdbc || require('jdbc');
};

// Attach a `Formatter` constructor to the client object.
Client_FMJDBC.prototype.initFormatter = function() {
  require('./formatter')(this);
};

// Attaches the `Raw` constructor to the client object.
Client_FMJDBC.prototype.initRaw = function() {
  require('./raw')(this);
};

// Attaches the `FunctionHelper` constructor to the client object.
Client_FMJDBC.prototype.initFunctionHelper = function() {
  require('./functionhelper')(this);
};

// Attaches the `Transaction` constructor to the client object.
Client_FMJDBC.prototype.initTransaction = function() {
  require('./transaction')(this);
};

// Attaches `QueryBuilder` and `QueryCompiler` constructors
// to the client object.
Client_FMJDBC.prototype.initQuery = function() {
  require('./query')(this);
};

// Initializes a new pool instance for the current client.
Client_FMJDBC.prototype.initPool = function() {
  require('./pool')(this);
};

// Initialize the query "runner"
Client_FMJDBC.prototype.initRunner = function() {
  require('./runner')(this);
};

// Lazy-load the schema dependencies; we may not need to use them.
Client_FMJDBC.prototype.initSchema = function() {
  require('./schema')(this);
};

// Lazy-load the migration dependency
Client_FMJDBC.prototype.initMigrator = function() {
  require('./migrator')(this);
};

// Lazy-load the seeding dependency
Client_FMJDBC.prototype.initSeeder = function() {
  require('./seeder')(this);
};

// Get a raw connection, called by the `pool` whenever a new
// connection needs to be added to the pool.
Client_FMJDBC.prototype.acquireRawConnection = Promise.method(function(callback) {
  /*jshint unused: false*/
  // TODO: use callback or remove callback
  var client = this;
  var connection = new (jdbc);
  connection.initialize(this.connectionSettings, function(err, res){

  });

  return new Promise(function(resolver, rejecter) {
    connection.open(function(err, connection) {
      if (err) return rejecter(err);
      resolver(connection);
    });
  });
});

// Used to explicitly close a connection, called internally by the pool
// when a connection times out or the pool is shutdown.
Client_FMJDBC.prototype.destroyRawConnection = function(connection) {
  connection.close();
};

module.exports = Client_FMJDBC;
