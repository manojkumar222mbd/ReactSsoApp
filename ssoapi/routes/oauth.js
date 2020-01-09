const express = require('express');
const router = express.Router();
const appResponse = require('../lib/response');

const OAuth2Server = require('oauth2-server');
let Request = OAuth2Server.Request;
let Response = OAuth2Server.Response;

/*
Get Access Token:
POST /oauth/token
Params: {
	grant_type: password
	client_id: <CLIENT ID>
	scope: <SCOPE>
	username:<USER NAME>
	password:<PASSWORD>
}

Get Refresh Token:
POST /oauth/token
Params: {
	grant_type: refresh_token
	client_id: <CLIENT ID>
	scope: <SCOPE>
	client_secret:<CLIENT SECRET>
	refresh_token:<REFRESH TOKEN>
}
*/
router.post('/token', (req, res) => {
    let request = new Request(req);
    let response = new Response(res);
    request.headers['content-type'] = 'application/x-www-form-urlencoded';
    return process.app.oauth.token(request, response).then(token => {
        appResponse.success(res, token);
    }).catch(err => {
        appResponse.error(res, err, 401);
    });
});



/*
Authenticate:
GET /authenticate
Headers: {
	Authorization: Bearer <ACCESS TOKEN>
}
*/
router.get('/me', (req, res) => {
    let request = new Request(req);
    let response = new Response(res);

    return process.app.oauth.authenticate(request, response).then(function(token) {
    	appResponse.success(res, token);
    }).catch(function(err) {
        appResponse.error(res, 'Invalid Token', 498);
    });
});


router.delete('/token', (req, res) => {
    let request = new Request(req);
    let response = new Response(res);

    var result = process.app.oauth.authenticate(request, response).then(function(token) {
        process.app.oauth.options.model.revokeToken(token).then((result) => {
            appResponse.success(res, result);
        }).catch(function(err) {
            appResponse.error(res, 'Unauthorized', 401);
        });
    }).catch(function(err) {
        appResponse.success(res, 1);
    });
});

module.exports = router;