'use strict';

// FileMaker JDBC Schema Builder & Compiler
// FileMaker does not support Schemas - leaving file in place
// -------
module.exports = function(client) {

var inherits = require('inherits');
var Schema   = require('../../../schema');

// Schema Builder
// -------

function SchemaBuilder_FILEMAKER_JDBC() {
  this.client = client;
  Schema.Builder.apply(this, arguments);
}
inherits(SchemaBuilder_FILEMAKER_JDBC, Schema.Builder);

// Schema Compiler
// -------

function SchemaCompiler_FILEMAKER_JDBC() {
  this.client = client;
  this.Formatter = client.Formatter;
  Schema.Compiler.apply(this, arguments);
}
inherits(SchemaCompiler_FILEMAKER_JDBC, Schema.Compiler);

client.SchemaBuilder = SchemaBuilder_FILEMAKER_JDBC;
client.SchemaCompiler = SchemaCompiler_FILEMAKER_JDBC;

};
