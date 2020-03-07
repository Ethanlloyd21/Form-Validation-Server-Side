`use strict`;

const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', // use your mysql username.
    password: 'chargers619', // user your mysql password.
    database: 'login_db'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

connection.query = util.promisify(connection.query);

module.exports = connection;