'use strict';

// FileMaker JDBC Column Builder & Compiler
// -------
module.exports = function(client) {

var inherits = require('inherits');
var Schema   = require('../../../schema');

// Column Builder
// ------

function ColumnBuilder_FMJDBC() {
  this.client = client;
  Schema.ColumnBuilder.apply(this, arguments);
}
inherits(ColumnBuilder_FMJDBC, Schema.ColumnBuilder);

function ColumnCompiler_FMJDBC() {
  this.modifiers = ['nullable', 'defaultTo', 'comment'];
  this.Formatter = client.Formatter;
  Schema.ColumnCompiler.apply(this, arguments);
}
inherits(ColumnCompiler_FMJDBC, Schema.ColumnCompiler);

// Types
// ------
ColumnCompiler_FMJDBC.prototype.bigincrements = 'INT PRIMARY KEY';
ColumnCompiler_FMJDBC.prototype.bigint = 'INT';
ColumnCompiler_FMJDBC.prototype.binary = 'BLOB';
ColumnCompiler_FMJDBC.prototype.bit = 'BIT';
ColumnCompiler_FMJDBC.prototype.bool = 'BOOLEAN';

// Create the column definition for an enum type.
// Using method "2" here: http://stackoverflow.com/a/10984951/525714
ColumnCompiler_FMJDBC.prototype.enu = function(allowed) {
  return 'text check (' + this.formatter.wrap(this.args[0]) + " in ('" + allowed.join("', '")  + "'))";
};

ColumnCompiler_FMJDBC.prototype.double = 'DOUBLE';
ColumnCompiler_FMJDBC.prototype.floating = 'FLOAT';
ColumnCompiler_FMJDBC.prototype.increments = 'INT PRIMARY KEY';
ColumnCompiler_FMJDBC.prototype.json = 'VARCHAR (500276)';
ColumnCompiler_FMJDBC.prototype.smallint = 'INT';
ColumnCompiler_FMJDBC.prototype.tinyint = 'SMALLINT';
ColumnCompiler_FMJDBC.prototype.datetime = ''
ColumnCompiler_FMJDBC.prototype.timestamp = 'TIMESTAMP'
ColumnCompiler_FMJDBC.prototype.uuid = 'CHAR(36)';

// Modifiers:
// ------
ColumnCompiler_FMJDBC.prototype.comment = ' --' + comment;

client.ColumnBuilder = ColumnBuilder_FMJDBC;
client.ColumnCompiler = ColumnCompiler_FMJDBC;

};
