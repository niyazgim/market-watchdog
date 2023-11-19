const mysql2 = require('mysql2');

const connect = mysql2.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'market_watchdog',
})

module.exports = connect.promise();