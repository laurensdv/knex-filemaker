'use strict';
// FileMaker JDBC
// -------

//Require knex
var Knex = require('knex');

//Require dialects
var filemaker_jdbc = function() { return require('./filemaker-jdbc'); };
var filemaker_odbc = function() { return require('./filemaker-odbc'); };

//Add JDBC/ODBC dialect objects to client list
Knex.Clients["filemaker-jdbc"] = filemaker_jdbc;
Knex.Clients["filemaker-odbc"] = filemaker_odbc;


module.exports = Knex;
