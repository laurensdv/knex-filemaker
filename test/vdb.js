var vdb_jdbc = require('../vdb-jdbc');
var jdbc;
var jinst;
var path = require('path');

jinst = require('jdbc/lib/jinst');
jdbc = require('jdbc');
if (!jinst.isJvmCreated()) {
  jinst.addOption("-Xrs");
  jinst.setupClasspath([path.resolve(__dirname, '../vdb-jdbc/vendor/denodo-vdp-jdbcdriver.jar')]);
}

var config = {
  client: vdb_jdbc,
  connection: {
    host : 'cohen.local:9999',
    user : 'admin',
    password : 'admin',
    database : 'tutorial',
    port : '9999'
  }
};

var knex = require('knex')(config);

// knex.select('*').from('client').leftJoin('client_type', 'client.client_type', 'client_type.code').asCallback(function(err, rows) {
//   if (err) return console.error(err);
//   console.log(rows);
// });
//
// knex.select('name', 'surname').from('client').where('surname', 'Liang').asCallback(function(err, rows) {
//   if (err) return console.error(err);
//   console.log(rows);
// });

// knex.select('*').from('client').leftJoin('client_type', 'client.client_type', 'client_type.code').pipe(process.stdout);

knex.select('*').from('client').leftJoin('client_type', 'client.client_type', 'client_type.code').then(function (rows) {
  console.log(rows);
});
