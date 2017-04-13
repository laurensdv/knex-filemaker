'use strict';
// FileMaker & VDB JDBC
// -------

//Require knex
var Knex = require('knex');

//Require dialects
var filemaker_jdbc = function() { return require('./filemaker-jdbc'); };
var vdb_jdbc = function() { return require('./vdb-jdbc'); };

//Add JDBC/ODBC dialect objects to client list
//Knex.dialects["filemaker-jdbc"] = filemaker_jdbc;
//Knex.dialects["vdb-jdbc"] = vdb_jdbc;

module.exports = Knex;
