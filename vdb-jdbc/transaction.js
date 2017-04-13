'use strict';

module.exports = function(client) {

var inherits = require('inherits');
var Transaction = require('../node_modules/knex/lib/transaction');

function Transaction_VDB_JDBC() {
  this.client = client;
  Transaction.apply(this, arguments);
}
inherits(Transaction_VDB_JDBC, Transaction);

client.Transaction = Transaction_VDB_JDBC;

};
