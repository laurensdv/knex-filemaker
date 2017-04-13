'use strict';

module.exports = function(client) {

var Migrator = require('../node_modules/knex/lib/migrate');
var inherits = require('inherits');

// Inherit from the `Migrator` constructor's prototype,
// so we can add the correct `then` method.
function Migrator_VDB_JDBC() {
  this.client = client;
  Migrator.apply(this, arguments);
}
inherits(Migrator_VDB_JDBC, Migrator);

// Assign the newly extended `Migrator` constructor to the client object.
client.Migrator = Migrator_VDB_JDBC;

};
