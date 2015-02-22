'use strict';

module.exports = function(client) {

var inherits = require('inherits');
var Transaction = require('../../transaction');

function Transaction_FMJDBC() {
  this.client = client;
  Transaction.apply(this, arguments);
}
inherits(Transaction_FMJDBC, Transaction);

client.Transaction = Transaction_FMJDBC;

};
