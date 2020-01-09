var pool = require('../../lib/databases');
var moment = require('moment');
var async = require("async");
var isNumber = /^[0-9]+$/;
exports.getAllGroup = function(req, callback) {
    var limit = req.param('limit') || 10;
    var offset = req.param('offset') || 0;
    var sSearch = req.param("search") && req.param("search") != '' ? req.param("search").trim() : '';
    pool.getDb(function(err, db) {
        if (err) {
            return callback(err);
        }
        var sql = 'SELECT id, tenant_id, name, created_datetime FROM groups';
        var where = ' WHERE is_deleted=0';
        if (req.oauth.user.scope == "tenant") {
            where += ' AND tenant_id=' + db.escape(req.oauth.user.id);
        }
        if (req.oauth.user.scope == "tenant") {
            where += ' AND tenant_id=' + db.escape(req.oauth.user.id);
        }
        if (sSearch) {
            where += ' AND (name like ' + db.escape('%' + sSearch + '%');
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
exports.getGroup = function(req, callback) {
    if (!parseInt(req.param('groupid')) || isNumber.test(req.param('groupid')) == false) {
        return callback({
            message: "Invalid Group id.",
            status: 0
        });
    }
    if (req.oauth.user.scope == "admin" && isNumber.test(req.param('tenant_id')) == false) {
        return callback({
            message: "Invalid Tenant id.",
            status: 0
        });
    }
    pool.getDb(function(err, db) {
        if (err) {
            return callback(err);
        }
        var sql = 'SELECT id, tenant_id, name, created_datetime FROM groups';
        var where = ' WHERE is_deleted=0';
        if (req.oauth.user.scope == "tenant") {
            where += ' AND tenant_id=' + db.escape(req.oauth.user.id) + ' AND id=' + db.escape(req.param('groupid'));
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
exports.saveGroup = function(req, callback) {
    if (!req.param('name') || req.param('name') == '') {
        return callback({
            message: "Group name can\'t be blank.",
            status: 0
        });
    }
    if (req.oauth.user.scope == "admin" && (!parseInt(req.param('tenant_id')) || parseInt(req.param('tenant_id')) == '')) {
        return callback({
            message: "Tenant id can\'t be blank.",
            status: 0
        });
    }
    var tenantId = (req.oauth.user.scope == "admin") ? parseInt(req.param('tenant_id')) : req.oauth.user.tenant_id;
    var stmt = {
        tenant_id: tenantId,
        name: req.param('name'),
        created_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
        created_by: req.oauth.user.id
    };
    pool.getDb(function(err, db) {
        /*db.query('SELECT * FROM groups WHERE name =' + db.escape(req.param('name')), function(error, res) {
            if (res && res.length > 0) {
                pool.returnDb(db);
                if (error) {
                    return callback(error)
                }
                callback(null, "Group aready exist");
            } else {
                db.query('INSERT INTO groups SET ?', stmt, function(error, results, fields) {
                    pool.returnDb(db);
                    if (error) {
                        return callback(error)
                    }
                    callback(null, results.insertId);
                });
            }
        });*/
        if (err) {
            return callback(err);
        }
        async.waterfall([
            function(callback) { //check for duplicacy
                db.query('SELECT id FROM groups WHERE tenant_id=' + db.escape(tenantId) + ' AND  name ="' + db.escape(req.param('name')) + '"', function(err, res) {
                    if (err) {
                        return callback(err);
                    }
                    if (res && res.length > 0) {
                        return callback(null, {
                            status: 0,
                            response: "Group already exist"
                        });
                    } else {
                        callback(null);
                    }
                });
            },
            function(callback) {
                db.query('INSERT INTO groups SET ?', stmt, function(err, res) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, {
                        status: 1,
                        insertId: results.insertId,
                        response: "Group added successfully"
                    });
                });
            }
        ], function(err, result) {
            pool.returnDb(db);
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    });
};
exports.updateGroup = function(req, callback) {
    if (!req.param('name') || req.param('name') == '') {
        return callback({
            message: "Group name can\'t be blank.",
            status: 0
        });
    }
    if (!parseInt(req.param('groupid')) || isNumber.test(req.param('groupid')) == false) {
        return callback({
            message: "Invalid Group id.",
            status: 0
        });
    }
    if (req.oauth.user.scope == "admin" && isNumber.test(req.param('tenant_id')) == false) {
        return callback({
            message: "Invalid Tenant id.",
            status: 0
        });
    }
    var tenantId = (req.oauth.user.scope == "admin") ? parseInt(req.param('tenant_id')) : req.oauth.user.tenant_id;
    var stmt = {
        tenant_id: tenantId,
        name: req.param('name'),
        modified_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
        modified_by: req.oauth.user.id
    };
    pool.getDb(function(err, db) {
        /*db.query('SELECT * FROM groups WHERE name =' + db.escape(req.param('name')), function(error, res) {
            if (res && res.length > 0) {
                pool.returnDb(db);
                if (error) {
                    return callback(error)
                }
                callback(null, "Please provide valid details");
            } else {
                pool.getDb(function(err, db) {
                    db.query("Update groups set ? WHERE id =" + db.escape(req.param('groupid')), stmt, function(error, results) {
                        pool.returnDb(db);
                        if (error) {
                            return callback(error)
                        }
                        callback(null, req.param('groupid'));
                    });
                });
            }
        });*/
        if (err) {
            return callback(err);
        }
        async.waterfall([
            function(callback) { //check for duplicacy
                db.query('SELECT id FROM groups WHERE tenant_id=' + db.escape(tenantId) + ' AND name ="' + db.escape(req.param('name')) + '"', function(err, res) {
                    if (err) {
                        return callback(err);
                    }
                    if (res && res.length > 0) {
                        return callback(null, {
                            status: 0,
                            response: "Group already exist"
                        });
                    } else {
                        callback(null);
                    }
                });
            },
            function(callback) {
                db.query("Update groups set ? WHERE id =" + db.escape(req.param('groupid')), stmt, function(error, results) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, {
                        status: 1,
                        updateId: req.param('groupid'),
                        response: "Group updated successfully"
                    });
                });
            }
        ], function(err, result) {
            pool.returnDb(db);
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    });
};
exports.deleteGroup = function(req, callback) {
    if (!parseInt(req.param('groupid')) || isNumber.test(req.param('groupid')) == false) {
        return callback({
            message: "Invalid Group id",
            status: 0
        });
    }
    if (req.oauth.user.scope == "admin" && isNumber.test(req.param('tenant_id')) == false) {
        return callback({
            message: "Invalid Tenant id",
            status: 0
        });
    }
    var tenantId = (req.oauth.user.scope == "admin") ? parseInt(req.param('tenant_id')) : req.oauth.user.tenant_id;
    var stmt = {
        is_deleted: 1,
        deleted_by: req.oauth.user.id,
        modified_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
        modified_by: req.oauth.user.id
    };
    pool.getDb(function(err, db) {
        /*if (req.oauth.user.scope == "tenant") {
            var str = ' tenant_id=' + db.escape(req.oauth.user.id) + ' and id=' + db.escape(req.param('groupid'));
        }
        db.query("Update groups SET is_deleted=1, modified_datetime ='" + moment().format('YYYY-MM-DD hh:mm:ss') + "', deleted_by=" + db.escape(req.oauth.user.id) + " WHERE " + str, function(error, results) {
            pool.returnDb(db);
            if (error) {
                return callback(error)
            }
            if (results.affectedRows == 0) {
                callback(null, "Detail is not valid");
            } else {
            	callback({
		            message: "Group deleted successfully",
		            status: 1
		        });
            }
        });*/
        if (err) {
            return callback(err);
        }
        async.waterfall([
            function(callback) { //check for duplicacy
                db.query('SELECT id FROM groups WHERE tenant_id=' + db.escape(tenantId) + ' AND id ="' + db.escape(req.param('groupid')) + '"', function(err, res) {
                    if (err) {
                        return callback(err);
                    }
                    if (res && res.length == 0) {
                        return callback(null, {
                            status: 0,
                            response: "Detail is not valid"
                        });
                    } else {
                        callback(null);
                    }
                });
            },
            function(callback) {
                db.query("Update groups set ? WHERE id =" + db.escape(req.param('groupid')), stmt, function(error, results) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, {
                        status: 1,
                        response: "Group deleted successfully"
                    });
                });
            }
        ], function(err, result) {
            pool.returnDb(db);
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    });
};