'use strict';

module.exports = function(client) {

var FunctionHelper = require('../../functionhelper');

var FunctionHelper_FMJDBC = Object.create(FunctionHelper);
FunctionHelper_FMJDBC.client = client;

// Assign the newly extended `FunctionHelper` constructor to the client object.
client.FunctionHelper = FunctionHelper_FMJDBC;

};
