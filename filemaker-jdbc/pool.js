'use strict';

module.exports = function(client) {

var Pool     = require('../node_modules/knex/lib/pool');
var inherits = require('inherits');
var _        = require('lodash');

// Inherit from the `Pool` constructor's prototype.
function Pool_FILEMAKER_JDBC() {
  this.client = client;
  Pool.apply(this, arguments);
}
inherits(Pool_FILEMAKER_JDBC, Pool);

Pool_FILEMAKER_JDBC.prototype.defaults = function() {
  return _.extend(Pool.prototype.defaults.call(this), {
    destroy: function(client) { client.close(function(err, res){
      
    }); }
  });
};
// Assign the newly extended `Pool` constructor to the client object.
client.Pool = Pool_FILEMAKER_JDBC;

};
