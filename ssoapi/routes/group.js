var express = require('express')
var router = express.Router()
var GM = require('./modules/group-manager');
var apResponse = require('../lib/response');
var oauthMiddleware = require("../lib/oauth2-server/middleware/oauth2-middleware");
router.get('/', oauthMiddleware.authenticateHandler, function(req, res) {
    GM.getAllGroup(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
router.get('/:groupid', oauthMiddleware.authenticateHandler, function(req, res) {
    GM.getGroup(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
router.post('/', oauthMiddleware.authenticateHandler, function(req, res) {
    GM.saveGroup(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
router.put('/:groupid', oauthMiddleware.authenticateHandler, function(req, res) {
    GM.updateGroup(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
router.delete('/:groupid', oauthMiddleware.authenticateHandler, function(req, res) {
    GM.deleteGroup(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
module.exports = router;