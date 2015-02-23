A plugin for Knex that connects to FileMaker via JDBC/ODBC (xDBC).

This requires ODBC to be enabled on the server (if using a server) and on the filemaker file itself.

Resources:
[FileMaker 13 ODBC/JDBC guide (pdf)](https://fmhelp.filemaker.com/docs/13/en/fm13_odbc_jdbc_guide.pdf)

JDBC:
```js
var knex = require('knex-filemaker')({
  client: 'filemaker-jdbc',
  connection: {
    host: "192.168.0.1",
    database: "Database Name",
    user: "filemaker_username",
    password: "filemaker_password",
  }
});
```

ODBC (not yet implemented):
```js
var knex = require('knex')({
  client: 'filemaker-odbc',
  connection: {
    host: "192.168.0.1",
    database: "DatabaseName",
    user: "username",
    password: "password",
  }
});
```
