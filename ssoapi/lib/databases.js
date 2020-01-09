var config = require("../config_development");

var _ = require("underscore");
var mysql = require('mysql');

var pool = mysql.createPool(_.extend(config.db, {
    connectionLimit: 10,
    debug: false //['ComQueryPacket']
}));

exports.getDb = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err);
        }
        callback(null, connection);
    });
}

exports.returnDb = (connection, callback) => {
    callback = callback || function() {}
    connection.release();
    callback(null);
}

exports.queryDb = (connection, sql, callback) => {
    connection.query(sql, function (err, results) {
        if(err) {
            return callback(err);
        }
        callback(null, results);
    });
}