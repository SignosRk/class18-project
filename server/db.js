var mysql = require('mysql');

const { promisify } = require('util');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xblood00dark',
    database: 'class18_db',
});

db.queryPromise = promisify(db.query);

module.exports = db;
