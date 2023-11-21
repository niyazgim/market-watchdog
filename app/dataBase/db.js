const mysql2 = require('mysql2');

const connect = mysql2.createPool({
    connectionLimit: 100,
    // user: 'z597',
    // password: 'bPaxLePYWrYYSkLN',
    // database: 'z597',
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'market_watchdog',
})

module.exports = connect.promise();