var pool = require('../../lib/databases');
var moment = require('moment');
var async = require("async");
var isNumber = /^[0-9]+$/;

exports.getAllApplication = function(req, callback) {
    var limit = req.param('limit') || 10;
    var offset = req.param('offset') || 0;
    var sSearch = req.param("search") && req.param("search") != '' ? req.param("search").trim() : '';
    pool.getDb(function(err, db) {
        if (err) {
            return callback(err);
        }
        var sql = 'SELECT A.id, A.tenant_id, A.name, A.icon, A.description, A.status, A.application_type_id, A.application_category_id, A.application_connector_id,';
        sql += ' T.name, CAT.name, CON.name, CON.login_url, CON.connector_json, CON.preauth_script, CON.preauth_delay, CON.postauth_script, CON.postauth_delay';
        sql += ' FROM applications A';
        sql += ' INNER JOIN application_types T on T.id=A.application_type_id';
        sql += ' INNER JOIN application_categories CAT on CAT.id=A.application_category_id';
        sql += ' INNER JOIN application_connectors CON on CON.id=A.application_connector_id';
        var where = ' WHERE A.is_deleted=0';
        if (req.oauth.user.scope == "tenant") {
            where += ' AND A.tenant_id=' + db.escape(req.oauth.user.id);
        }
        if (req.param("applicationTypeId") && req.param("applicationTypeId") != '-1') {
            where += ' AND T.id=' + db.escape(req.param("applicationTypeId"));
        }
        if (req.param("applicationCategoryId") && req.param("applicationCategoryId") != '-1') {
            where += ' AND CAT.id=' + db.escape(req.param("applicationCategoryId"));
        }
        if (req.param("applicationConnectorId") && req.param("applicationConnectorId") != '-1') {
            where += ' AND CON.id=' + db.escape(req.param("applicationConnectorId"));
        }
        if (sSearch) {
            where += ' AND (A.name like ' + cdbr.escape('%' + sSearch + '%') + ' or T.name like ' + cdbr.escape('%' + sSearch + '%') + ' or CAT.name like ' + cdbr.escape('%' + sSearch + '%') + ') or CON.name like ' + cdbr.escape('%' + sSearch + '%') + ')';
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
exports.getApplication = function(req, callback) {
    if (!parseInt(req.param('applicationid')) || isNumber.test(req.param('applicationid')) == false) {
        return callback({
            message: "Invalid Application id",
            status: 0
        });
    }
    if (req.oauth.user.scope == "admin" && isNumber.test(req.param('tenant_id')) == false) {
        return callback({
            message: "Invalid Tenant id",
            status: 0
        });
    }
    pool.getDb(function(err, db) {
        if (err) {
            return callback(err);
        }
        var sql = 'SELECT A.id, A.tenant_id, A.name, A.icon, A.description, A.status, A.application_type_id, A.application_category_id, A.application_connector_id,';
        sql += ' T.name, CAT.name, CON.name, CON.login_url, CON.connector_json, CON.preauth_script, CON.preauth_delay, CON.postauth_script, CON.postauth_delay';
        sql += ' FROM applications A';
        sql += ' INNER JOIN application_types T on T.id=A.application_type_id';
        sql += ' INNER JOIN application_categories CAT on CAT.id=A.application_category_id';
        sql += ' INNER JOIN application_connectors CON on CON.id=A.application_connector_id';
        var where = ' WHERE A.is_deleted=0';
        if (req.oauth.user.scope == "tenant") {
            where += ' AND tenant_id=' + db.escape(req.oauth.user.id) + ' AND id=' + db.escape(req.param('applicationid'));
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
exports.saveApplication = function(req, callback) {
    if (!req.param('name') || req.param('name') == '') {
        return callback({
            message: "Application name can\'t be blank",
            status: 0
        });
    }
    if (req.oauth.user.scope == "admin" && (!parseInt(req.param('tenant_id')) || parseInt(req.param('tenant_id')) == '')) {
        return callback({
            message: "Tenant id can\'t be blank",
            status: 0
        });
    }
    var tenantId = (req.oauth.user.scope == "admin") ? parseInt(req.param('tenant_id')) : req.oauth.user.tenant_id;
    var stmt = {
        tenant_id: tenantId,
        name: req.param('name'),
        application_type_id: req.param('application_type_id'),
        application_category_id: req.param('application_category_id'),
        icon: req.param('iconpath'),
        description: req.param('description'),
        application_connector_id: req.param('application_connector_id'),
        status: req.param('status'),
        created_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
        created_by: req.oauth.user.id
    };
    pool.getDb(function(err, db) {
        /*db.query('SELECT id FROM applications WHERE name =' + db.escape(req.param('name')), function(error, res) {
            if (res && res.length > 0) {
                pool.returnDb(db);
                if (error) {
                    return callback(error)
                }
                callback(null, "Application aready exist");
            } else {
                db.query('INSERT INTO applications SET ?', stmt, function(error, results, fields) {
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
                db.query('SELECT id FROM applications WHERE tenant_id=' + db.escape(tenantId) + ' AND name ="' + db.escape(req.param('name')) + '"', function(err, res) {
                    if (err) {
                        return callback(err);
                    }
                    if (res && res.length > 0) {
                        return callback(null, {
                            status: 0,
                            response: "Application already exist"
                        });
                    } else {
                        callback(null);
                    }
                });
            },
            function(callback) {
                db.query('INSERT INTO applications SET ?', stmt, function(err, res) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, {
                        status: 1,
                        insertId: results.insertId,
                        response: "Application added successfully"
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
exports.updateApplication = function(req, callback) {
    if (!req.param('name') || req.param('name') == '') {
        return callback({
            message: "Application name can\'t be blank",
            status: 0
        });
    }
    if (!parseInt(req.param('applicationid')) || isNumber.test(req.param('applicationid')) == false) {
        return callback({
            message: "Invalid Application id",
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
        tenant_id: tenantId,
        name: req.param('name'),
        application_type_id: req.param('application_type_id'),
        application_category_id: req.param('application_category_id'),
        icon: req.param('iconpath'),
        description: req.param('description'),
        application_connector_id: req.param('application_connector_id'),
        status: req.param('status'),
        modified_datetime: moment().format('YYYY-MM-DD hh:mm:ss'),
        modified_by: req.oauth.user.id
    };
    pool.getDb(function(err, db) {
        /*db.query('SELECT * FROM applications WHERE name =' + db.escape(req.param('name')), function(error, res) {
            if (res && res.length > 0) {
                pool.returnDb(db);
                if (error) {
                    return callback(error)
                }
                callback(null, "Please provide valid details");
            } else {
                pool.getDb(function(err, db) {
                    db.query("Update applications set ? WHERE id =" + db.escape(req.param('applicationid')), stmt, function(error, results) {
                        pool.returnDb(db);
                        if (error) {
                            return callback(error)
                        }
                        callback(null, req.param('applicationid'));
                    });
                });
            }
        });*/
        if (err) {
            return callback(err);
        }
        async.waterfall([
            function(callback) { //check for duplicacy
                db.query('SELECT id FROM applications WHERE tenant_id=' + db.escape(tenantId) + ' AND name ="' + db.escape(req.param('name')) + '"', function(err, res) {
                    if (err) {
                        return callback(err);
                    }
                    if (res && res.length > 0) {
                        return callback(null, {
                            status: 0,
                            response: "Application already exist"
                        });
                    } else {
                        callback(null);
                    }
                });
            },
            function(callback) {
                db.query("Update applications set ? WHERE id =" + db.escape(req.param('applicationid')), stmt, function(error, results) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, {
                        status: 1,
                        updateId: req.param('applicationid'),
                        response: "Application updated successfully"
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
exports.deleteApplication = function(req, callback) {
    if (!parseInt(req.param('applicationid')) || isNumber.test(req.param('applicationid')) == false) {
        return callback({
            message: "Invalid Application id",
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
            var str = ' tenant_id=' + db.escape(req.oauth.user.id) + ' and id=' + db.escape(req.param('applicationid'));
        }
        db.query("Update applications SET is_deleted=1, modified_datetime ='" + moment().format('YYYY-MM-DD hh:mm:ss') + "', deleted_by=" + db.escape(req.oauth.user.id) + " WHERE " + str, function(error, results) {
            pool.returnDb(db);
            if (error) {
                return callback(error)
            }
            if (results.affectedRows == 0) {
                callback(null, "Detail is not valid");
            } else {
                callback({
                    message: "Application deleted successfully",
                    status: 1
                });
            }
        });*/
        if (err) {
            return callback(err);
        }
        async.waterfall([
            function(callback) { //check for duplicacy
                db.query('SELECT id FROM applications WHERE tenant_id=' + db.escape(tenantId) + ' AND id ="' + db.escape(req.param('applicationid')) + '"', function(err, res) {
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
                db.query("Update applications set ? WHERE id =" + db.escape(req.param('applicationid')), stmt, function(error, results) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, {
                        status: 1,
                        response: "Application deleted successfully"
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