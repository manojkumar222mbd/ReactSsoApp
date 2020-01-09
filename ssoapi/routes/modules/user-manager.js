var pool = require('../../lib/databases');
var moment = require('moment');
var async = require("async");
var passwordHash = require('password-hash');

exports.getallUser = function(req, callback) {
    var limit = req.param('limit') || 10;
    var offset = req.param('offset') || 0;
    var sSearch = req.param("search") && req.param("search") != '' ? req.param("search").trim() : '';
    pool.getDb(function(err, db) {
        if (err) {
            return callback(err);
        }
        var sql = 'SELECT id,tenant_id,name,address,email,password,phone,status,scope,created_by,DATE_FORMAT(created_datetime, "%d-%m-%Y") as created_datetime FROM users';
        var where = ' WHERE is_deleted=0';
        if (req.oauth.user.scope == "admin") {
            where += ' AND scope="tenant"';
        }
        if (req.oauth.user.scope == "tenant") {
            where += ' AND scope="profile" AND tenant_id=' + db.escape(req.oauth.user.id);
        }
        if (req.param('search') && req.param('search') != '') {
            where += ' AND tenant_id=' + db.escape(req.oauth.user.id);
        }
        if (sSearch) {
            where += ' AND (name like ' + db.escape('%' + sSearch + '%') + ' or email like ' + db.escape('%' + sSearch + '%') + ' or phone like ' + db.escape('%' + sSearch + '%') + ')';
        }
        if (limit && offset) {
            where += ' limit ' + offset + ', ' + limit;
        }
        db.query(sql + where, function(error, results, fields) {
            pool.returnDb(db);
            if (error) {
                return callback(error)
            }
            callback(null, results);
        });
    });
};
exports.getUser = function(req, callback) {
    pool.getDb(function(err, db) {
        if (err) {
            return callback(err);
        }
        var sql = 'SELECT id, tenant_id, name, address, email, phone, status, scope, created_datetime from users';
        var where = ' WHERE is_deleted=0';
        if (req.oauth.user.scope == "admin") {
            where += ' AND scope="tenant" AND id=' + db.escape(req.params.userid);
        }
        if (req.oauth.user.scope == "tenant") {
            where += ' AND scope="profile" AND tenant_id=' + db.escape(req.oauth.user.id) + ' AND id=' + db.escape(req.params.userid);
        }
        db.query(sql + where, function(error, results, fields) {
            pool.returnDb(db);
            if (error) {
                return callback(error)
            }
            callback(null, results);
        });
    });
};
exports.saveUser = function(req, callback) {
    var stmt = {
        tenant_id: (req.oauth.user.scope == "admin") ? req.body.tenant_id : req.oauth.user.tenant_id,
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        phone: req.body.phone,
        status: req.body.status,
        scope: (req.oauth.user.scope == "admin") ? 'tenant' : 'profile',
        created_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
        created_by: req.oauth.user.id
    };
    pool.getDb(function(err, db) {
        if (err) {
            return callback(err);
        }
        async.waterfall([
            function(callback) { //check for duplicacy
                db.query('SELECT * from users where email =' + db.escape(req.body.email), function(err, res) {
                    if (err) {
                        return callback(err);
                    }
                    if (res && res.length) {
                        return callback("User Aready Exist");
                    } else {
                        callback(null);
                    }
                });
            },
            function(callback) { //add new user
                db.query('INSERT INTO users SET ?', stmt, function(error, results, fields) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, results);
                });
            }
        ], function(err, results) {
            pool.returnDb(db);
            if (err) {
                return callback(err);
            }
            callback(null, {
                'id': results.insertId,
                'message': "User add successfully"
            });
        });
    });
};
exports.saveUpdate = function(req, callback) {
    var stmt = {
        tenant_id: (req.oauth.user.scope == "admin") ? req.body.tenant_id : req.oauth.user.tenant_id,
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        status: req.body.status,
        scope: (req.oauth.user.scope == "admin") ? 'tenant' : 'profile',
        modified_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
        modified_by: req.oauth.user.id
    };
    pool.getDb(function(err, db) {
        if (err) {
            return callback(err);
        }
        async.waterfall([
            function(callback) { //check for duplicacy
                db.query('SELECT * from users where email =' + db.escape(req.body.email), function(err, res) {
                    if (err) {
                        return callback(err);
                    }
                    if (res == 0 || res.length == 1) {
                        callback(null);
                    } else {
                        return callback("User Aready Exist");
                    }
                });
            },
            function(callback) { //add new user
                db.query("Update users set ? WHERE id =" + db.escape(req.params.userid), stmt, function(error, results, fields) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null);
                });
            }
        ], function(err) {
            pool.returnDb(db);
            if (err) {
                return callback(err);
            }
            callback(null, {
                'id': req.params.userid,
                'message': "User successfully updated"
            });
        });
    });
};
exports.deleteUser = function(req, callback) {
    pool.getDb(function(err, db) {
        if (req.oauth.user.scope == "admin") {
            var str = ' scope="tenant" and id=' + db.escape(req.params.userid);
        }
        if (req.oauth.user.scope == "tenant") {
            var str = ' scope="profile" and tenant_id=' + db.escape(req.oauth.user.id) + ' and id=' + db.escape(req.params.userid);
        }
        db.query("Update users set is_deleted=1, modified_datetime ='" + moment().format('YYYY-MM-DD hh:mm:ss') + "', deleted_by=" + db.escape(req.oauth.user.id) + " WHERE " + str, function(error, results) {
            pool.returnDb(db);
            if (error) {
                return callback(error)
            }
            if (results.affectedRows == 0) {
                callback("Detail is not valid");
            } else {
                callback(null, {
                    'id': req.params.userid,
                    'message': "User successfully deleted"
                });
            }
        });
    });
}