'use strict';

// FileMaker JDBC Schema Builder & Compiler
// FileMaker does not support Schemas - leaving file in place
// -------
module.exports = function(client) {

var inherits = require('inherits');
var Schema   = require('../../../schema');

// Schema Builder
// -------

function SchemaBuilder_FMJDBC() {
  this.client = client;
  Schema.Builder.apply(this, arguments);
}
inherits(SchemaBuilder_FMJDBC, Schema.Builder);

// Schema Compiler
// -------

function SchemaCompiler_FMJDBC() {
  this.client = client;
  this.Formatter = client.Formatter;
  Schema.Compiler.apply(this, arguments);
}
inherits(SchemaCompiler_FMJDBC, Schema.Compiler);

client.SchemaBuilder = SchemaBuilder_FMJDBC;
client.SchemaCompiler = SchemaCompiler_FMJDBC;

};
