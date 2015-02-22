'use strict';

// FileMaker JDBC Query Builder & Compiler
// ------
module.exports = function(client) {

var _        = require('lodash');
var inherits = require('inherits');

var QueryBuilder  = require('../../query/builder');
var QueryCompiler = require('../../query/compiler');

// Query Builder
// ------

function QueryBuilder_FMJDBC() {
  this.client = client;
  QueryBuilder.apply(this, arguments);
  if (client.defaultReturning) {
    this._single.returning = client.defaultReturning;
  }
}
inherits(QueryBuilder_FMJDBC, QueryBuilder);

// Query Compiler
// ------

function QueryCompiler_FMJDBC() {
  this.formatter = new client.Formatter();
  QueryCompiler.apply(this, arguments);
}
inherits(QueryCompiler_FMJDBC, QueryCompiler);

// Used when the insert call is empty.
QueryCompiler_FMJDBC.prototype._emptyInsertValue = ' ';

// is used if the an array with multiple empty values supplied
QueryCompiler_FMJDBC.prototype._defaultInsertValue = ' ';

// Compiles an `insert` query, allowing for multiple
// inserts using a single query statement.
QueryCompiler_FMJDBC.prototype.insert = function() {
  var self = this;
  var insertValues = this.single.insert;

  var sql = 'INSERT INTO ' + this.tableName;

  if (_.isArray(insertValues) && (insertValues.length === 1) && _.isEmpty(insertValues[0])) {
    insertValues = [];
  }

    var insertData = this._prepInsert(insertValues);

    if (_.isString(insertData)) {
      sql += insertData;
    } else  {
        sql += '(' + this.formatter.columnize(insertData.columns) + ') VALUES (' +
          _.map(insertData.values, this.formatter.parameterize, this.formatter).join('), (') + ')';
    }

  var returning  = this.single.returning;
  return {
    sql: sql + returning,
    returning: returning
  };
};

// Compiles an `update` query, allowing for a return value.
QueryCompiler_FMJDBC.prototype.update = function() {
  var updateData = this._prepUpdate(this.single.update);
  var wheres     = this.where();
  var returning  = this.single.returning;
  return {
    sql: 'UPDATE ' + this.tableName + ' SET ' + updateData.join(', ') +
    (wheres ? ' ' + wheres : '') +
    returning,
    returning: returning
  };
};

// Compiles an `delete` query, allowing for a return value.
QueryCompiler_FMJDBC.prototype.del = function() {
  var sql = QueryCompiler.prototype.del.apply(this, arguments);
  var returning  = this.single.returning;
  return {
    sql: 'DELETE FROM ' + this.tableName +
    (wheres ? ' ' + wheres : '') +
    returning,
    returning: returning
  };
};

QueryCompiler_FMJDBC.prototype.forUpdate = function() {
  return 'FOR UPDATE';
};
QueryCompiler_FMJDBC.prototype.limit = function() {
  return '';
  };
client.QueryBuilder = QueryBuilder_FMJDBC;
client.QueryCompiler = QueryCompiler_FMJDBC;

};
