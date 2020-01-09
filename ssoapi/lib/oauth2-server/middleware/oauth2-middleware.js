const OAuth2Server = require('oauth2-server');
const apResponse = require("../../response");
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

exports.authenticateHandler = (req, res, next) => {
    let request = new Request(req);
    let response = new Response(res);
    return process.app.oauth.authenticate(request, response).then(token => {
        if(req.originalUrl.indexOf('/admin')!=-1 && token.user.scope.split(' ').filter(s => ['admin', 'tenant'].indexOf(s) >= 0).join(' ')=='') {
            return apResponse.error(res, 'Unauthorized', 401);
        }
    	req.oauth = token;
        next();
    }).catch(function(err) {
        apResponse.error(res, 'Unauthorized', 401);
    });
}