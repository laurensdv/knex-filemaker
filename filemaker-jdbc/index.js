/*jslint node:true, nomen:true */
/*globals _ */
'use strict';

// FileMaker JDBC
// -------
var _        = require('lodash');
var inherits = require('inherits');

var Client  = require('../node_modules/knex/lib/client');
var Promise = require('../node_modules/knex/lib/promise');

var jdbc;

// Always initialize with the "QueryBuilder" and "QueryCompiler"
// objects, which extend the base 'lib/query/builder' and
// 'lib/query/compiler', respectively.
function Client_FILEMAKER_JDBC(config) {

    Client.apply(this, arguments);
    if (config.returning) {
        this.defaultReturning = config.returning;
    }
    if (config.debug) {
        this.isDebugging = true;
    }
    if (config.connection) {
        this.initDriver();
        this.initRunner();
        this.connectionSettings = {
            libpath: './vendor/fmjdbc.jar',
            drivername: 'com.filemaker.jdbc.Driver',
            url: 'jdbc:filemaker://' + config.connection.host + '/' + config.connection.database,
            user: config.connection.user,
            password: config.connection.password
        };

        this.initPool();
        this.pool = new this.Pool(config.pool);
    }
}
inherits(Client_FILEMAKER_JDBC, Client);

Client_FILEMAKER_JDBC.prototype.dialect = 'filemaker-jdbc';

// Lazy load the pg dependency, since we might just be using
// the client to generate SQL strings.
Client_FILEMAKER_JDBC.prototype.initDriver = function () {
    jdbc = jdbc || require('jdbc');
};

// Attach a `Formatter` constructor to the client object.
Client_FILEMAKER_JDBC.prototype.initFormatter = function () {
    require('./formatter')(this);
};

// Attaches the `Raw` constructor to the client object.
Client_FILEMAKER_JDBC.prototype.initRaw = function () {
    require('./raw')(this);
};

// Attaches the `FunctionHelper` constructor to the client object.
Client_FILEMAKER_JDBC.prototype.initFunctionHelper = function () {
    require('./functionhelper')(this);
};

// Attaches the `Transaction` constructor to the client object.
Client_FILEMAKER_JDBC.prototype.initTransaction = function () {
    require('./transaction')(this);
};

// Attaches `QueryBuilder` and `QueryCompiler` constructors
// to the client object.
Client_FILEMAKER_JDBC.prototype.initQuery = function () {
    require('./query')(this);
};

// Initializes a new pool instance for the current client.
Client_FILEMAKER_JDBC.prototype.initPool = function () {
    require('./pool')(this);
};

// Initialize the query "runner"
Client_FILEMAKER_JDBC.prototype.initRunner = function () {
    require('./runner')(this);
};

// Lazy-load the schema dependencies; we may not need to use them.
Client_FILEMAKER_JDBC.prototype.initSchema = function () {
    require('./schema')(this);
};

// Lazy-load the migration dependency
Client_FILEMAKER_JDBC.prototype.initMigrator = function () {
    require('./migrator')(this);
};

// Lazy-load the seeding dependency
Client_FILEMAKER_JDBC.prototype.initSeeder = function () {
    require('./seeder')(this);
};

// Get a raw connection, called by the `pool` whenever a new
// connection needs to be added to the pool.
Client_FILEMAKER_JDBC.prototype.acquireRawConnection = Promise.method(function (callback) {
    /*jshint unused: false*/
    var connection = new jdbc;

    connection.initialize(this.connectionSettings, function (err, res) {
        if (err) {
            console.log(err + ' : ' + res);
        }
    });

    return new Promise(function (resolver, rejecter) {
        connection.open(function (err, res) {
            if (err) {
                return rejecter(err + ' : ' + res);
            }
            resolver(connection);
        });
    });
});

// Used to explicitly close a connection, called internally by the pool
// when a connection times out or the pool is shutdown.
Client_FILEMAKER_JDBC.prototype.destroyRawConnection = function (connection) {
    connection.close();
};

module.exports = Client_FILEMAKER_JDBC;
