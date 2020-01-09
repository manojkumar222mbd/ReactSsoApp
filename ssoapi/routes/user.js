var express = require('express')
var router = express.Router()

var UM = require('./modules/user-manager');
var apResponse = require('../lib/response');
var oauthMiddleware = require("../lib/oauth2-server/middleware/oauth2-middleware");

router.get('/', oauthMiddleware.authenticateHandler, function(req, res) {
    UM.getallUser(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});

router.get('/:userid', oauthMiddleware.authenticateHandler, function(req, res) {
    UM.getUser(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});

router.post('/', oauthMiddleware.authenticateHandler, function(req, res) {
    UM.saveUser(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});

router.put('/:userid', oauthMiddleware.authenticateHandler, function(req, res) {
    UM.saveUpdate(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});

router.delete('/:userid', oauthMiddleware.authenticateHandler, function(req, res, next) {
    UM.deleteUser(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
module.exports = router;