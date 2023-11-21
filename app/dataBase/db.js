const mysql2 = require('mysql2');

const connect = mysql2.createPool({
    connectionLimit: 100,
    // host: '127.0.0.1',
    // user: 'root',
    // password: 'root',
    // database: 'market_watchdog',
    host: 'bmvfuppt0udsbwdofemq-mysql.services.clever-cloud.com',
    user: 'uzousopph36lyok0',
    password: 'WouCRU85QkuDoCPZ3Sms',
    database: 'bmvfuppt0udsbwdofemq',
})

module.exports = connect.promise();