var express = require('express')
var router = express.Router()
var AM = require('./modules/application-manager');
var apResponse = require('../lib/response');
var oauthMiddleware = require("../lib/oauth2-server/middleware/oauth2-middleware");

router.get('/', oauthMiddleware.authenticateHandler, function(req, res) {
    AM.getAllApplication(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
router.get('/:applicationid', oauthMiddleware.authenticateHandler, function(req, res) {
    AM.getApplication(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
router.post('/', oauthMiddleware.authenticateHandler, function(req, res) {
    AM.saveApplication(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
router.put('/:applicationid', oauthMiddleware.authenticateHandler, function(req, res) {
    AM.updateApplication(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
router.delete('/:applicationid', oauthMiddleware.authenticateHandler, function(req, res) {
    AM.deleteApplication(req, function(err, result) {
        if (err) {
            apResponse.error(res, err);
        } else {
            apResponse.success(res, result);
        }
    });
});
module.exports = router;