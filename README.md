#knex-filemaker
##A plugin for Knex that connects to FileMaker via JDBC/ODBC (xDBC).

###Requirements:
* Node.js
* Knex w/ [UNICODE disabled](https://github.com/w1nk/node-odbc/issues/60)
* FileMaker Server or FileMaker Pro with xDBC enabled
* FileMaker account with xDBC
* Mac/Windows/Linux - Windows and Linux have not been tested at the moment

JDBC is Linux compatible since it runs on a JVM
ODBC is limited to Mac/Windows and you must install those drivers through the installers on FileMaker's website.

###Turn on xDBC:
* FileMaker Server Admin Console: Click ODBC/JDBC then select Enable ODBC/JDBC
* FileMaker Pro: Choose File menu >Sharing and set ODBC/JDBC Sharing to On

###Resources:
* [FileMaker 13 ODBC/JDBC guide (pdf)](https://fmhelp.filemaker.com/docs/13/en/fm13_odbc_jdbc_guide.pdf)
* [Configuring ODBC Driver for FileMaker (Mac/Windows) 13](http://help.filemaker.com/app/answers/detail/a_id/13293/~/configuring-odbc-driver-for-filemaker-13)
* [Download xDBC drivers (Labeled "xDBC update for FileMaker Server")](http://www.filemaker.com/support/downloads/)

###Examples:

I would suggest using this with Bookshelf.js which is a great ORM.

####JDBC:
```js
var knex = require('knex-filemaker')({
  client: 'filemaker-jdbc',
  connection: {
    host: "192.168.0.1", //IP of FileMaker Server (or FileMaker Pro) host.
    database: "DatabaseName", //Spaces may cause issues
    user: "filemaker_username",
    password: "filemaker_password",
  }
});
```

####ODBC:
```js
var knex = require('knex-filemaker')({
  client: 'filemaker-odbc',
  connection: {
    host: "192.168.0.1", //IP of FileMaker Server (or FileMaker Pro) host.
    database: "DatabaseName", //Spaces may cause issues
    user: "username",
    password: "password",
  }
});
```
