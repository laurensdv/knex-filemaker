# [knex.js](http://knexjs.org) [![Build Status](https://travis-ci.org/tgriesser/knex.png?branch=master)](https://travis-ci.org/tgriesser/knex) [![Coverage Status](https://coveralls.io/repos/tgriesser/knex/badge.png?branch=master)](https://coveralls.io/r/tgriesser/knex?branch=master)

A plugin for Knex that connects to FileMaker via JDBC/ODBC (xDBC).

JDBC:
```js
var knex = require('knex')({
  client: 'filemaker',
  connection: {
    driver: "jdbc",
    host: "192.168.0.1",
    database: "DatabaseName",
    user: "username",
    password: "password",
  }
});
```

ODBC:
```js
var knex = require('knex')({
  client: 'filemaker',
  connection: {
    driver: "odbc",
    host: "192.168.0.1",
    database: "DatabaseName",
    user: "username",
    password: "password",
  }
});
```
