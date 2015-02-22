'use strict';

// FileMaker JDBC Table Builder & Compiler
// Because of the limited abilities of FileMaker's JDBC Driver I've omited even
// the few parts that would work (create table, add/drop columns, create indexes)
// Because those would be altered in FileMaker realistically.
// -------
module.exports = function(client) {

var _        = require('lodash');
var inherits = require('inherits');
var Schema   = require('../../../schema');

// Table
// ------

function TableBuilder_FMJDBC() {
  this.client = client;
  Schema.TableBuilder.apply(this, arguments);
}
inherits(TableBuilder_FMJDBC, Schema.TableBuilder);

function TableCompiler_FMJDBC() {
  this.client = client;
  this.Formatter = client.Formatter;
  Schema.TableCompiler.apply(this, arguments);
}
inherits(TableCompiler_FMJDBC, Schema.TableCompiler);

client.TableBuilder = TableBuilder_FMJDBC;
client.TableCompiler = TableCompiler_FMJDBC;

};
