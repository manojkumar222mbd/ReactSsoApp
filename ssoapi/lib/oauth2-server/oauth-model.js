const redis = require('redis');
const oauthdb = require('./oauth-db');

const config = require("../../config_development");
const redisClient = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
    db: config.redis.db
});

exports.model = {
    getUser: (username, password) => {
        return new Promise((resolve, reject) => {
            oauthdb.queryUser({
                username: username,
                password: password
            }).then(user => {
                return resolve({
                    id: user.id,
                    username: user.username,
                    scope: user.scope
                });
            }).catch(function(err) {
                reject(err);
            });
        });
    },

    //Invoked to retrieve an existing access token previously saved through Model#saveToken().
    getAccessToken: accessToken => {
        return new Promise((resolve, reject) => {
            let key = config.redis.key_prefix + ':access_token:user:' + accessToken;
			redisClient.get(key, (err, r) => {
				if(err) {
					return reject(err);
				}
				if(r) {
					r = JSON.parse(r);
					r.accessTokenExpiresAt = new Date(r.accessTokenExpiresAt);
					return resolve(r);
                }
                // imaginary DB queries
                oauthdb.queryAccessToken({
                    access_token: accessToken
                }).then(token => {
                    return Promise.all([
                        token,
                        oauthdb.queryClient({
                            id: token.client_id
                        }),
                        oauthdb.queryUser({
                            user_id: token.user_id
                        })
                    ]);
                }).then(results => {
                    var data = {
                        accessToken: results[0].access_token,
                        accessTokenExpiresAt: results[0].expires_at,
                        scope: results[0].scope,
                        client: results[1], // with 'id' property
                        user: results[2]
                    };
                    var expires = Math.floor((new Date(results[0].expires_at).getTime() - new Date().getTime())/1000);
                    if(expires && expires>0) {
                        redisClient.setex(key, expires, JSON.stringify(data));
                    }
                    return resolve(data);
                }).catch(function(err) {
                    reject(err);
                });
			});
        });
    },

    //Invoked to retrieve an existing authorization code previously saved through Model#saveAuthorizationCode().
    getAuthorizationCode: authorizationCode => {
        return new Promise((resolve, reject) => {
            // imaginary DB queries
            oauthdb.queryAuthorizationCode({
                authorization_code: authorizationCode
            }).then(code => {
                return Promise.all([
                    code,
                    oauthdb.queryClient({
                        id: code.client_id
                    }),
                    oauthdb.queryUser({
                        user_id: code.user_id
                    })
                ]);
            }).then(results => {
                return resolve({
                    code: results[0].authorization_code,
                    expiresAt: results[0].expires_at,
                    redirectUri: results[0].redirect_uri,
                    scope: results[0].scope,
                    client: results[1], // with 'id' property
                    user: results[2]
                });
            }).catch(function(err) {
                reject(err);
            });
        });
    },

    //Invoked to retrieve a client using a client id or a client id/client secret combination, depending on the grant type.
    getClient: (clientId, clientSecret) => {
        return new Promise((resolve, reject) => {
            // imaginary DB query
            let params = {
                client_id: clientId
            };
            if (clientSecret) {
                params.client_secret = clientSecret;
            }
            oauthdb.queryClient(params).then(client => {
                if(!client) {
                    return reject('Invalid client or secret');
                }
                return resolve({
                    id: client.id,
                    redirectUris: client.redirect_uris,
                    grants: client.grants,
                    user_id: client.user_id
                });
            }).catch(function(err) {
                reject(err);
            });
        });
    },

    //Invoked to retrieve an existing refresh token previously saved through Model#saveToken().
    getRefreshToken: async refreshToken => {
        return new Promise((resolve, reject) => {
            // imaginary DB queries
            oauthdb.queryRefreshToken({
                refresh_token: refreshToken
            }).then(token => {
                return Promise.all([
                    token,
                    oauthdb.queryClient({
                        id: token.client_id
                    }),
                    oauthdb.queryUser({
                        user_id: token.user_id
                    })
                ]);
            }).then(results => {
                return resolve({
                    refreshToken: results[0].refresh_token,
                    refreshTokenExpiresAt: results[0].expires_at,
                    scope: results[0].scope,
                    client: results[1], // with 'id' property
                    user: results[2]
                });
            }).catch(function(err) {
                reject(err);
            });
        });
    },

    //Invoked to revoke an authorization code.
    revokeAuthorizationCode: async code => {
        return new Promise((resolve, reject) => {
            // imaginary DB queries
            return oauthdb.deleteAuthorizationCode({
                authorization_code: code.code
            }).then(authorizationCode => {
                return resolve(1);
            }).catch(function(err) {
                reject(err);
            });
        });
    },

    //Invoked to revoke a refresh token.
    revokeToken: async token => {
        let key = config.redis.key_prefix + ':access_token:' + token.accessToken;
        let key2 = config.redis.key_prefix + ':access_token:user:' + token.accessToken;
        return new Promise((resolve, reject) => {
            redisClient.get(key, (err, r) => {
				if(err) {
					return reject(err);
				}
				if(r) {
                    redisClient.del(key);
                    redisClient.del(key2);
					r = JSON.parse(r);
					r.accessTokenExpiresAt = new Date(r.accessTokenExpiresAt);
					return oauthdb.deleteRefreshToken(r).then(refreshToken => {
                        return resolve(1);
                    }).catch(function(err) {
                        return reject(err);
                    });
                }
                return resolve(1);
			});
        });
    },

    //Invoked to save an authorization code.
    saveAuthorizationCode: async (code, client, user) => {
        return new Promise((resolve, reject) => {
            // imaginary DB queries
            let authCode = {
                authorization_code: code.authorizationCode,
                expires_at: code.expiresAt,
                redirect_uri: code.redirectUri,
                scope: code.scope,
                client_id: client.id,
                user_id: user.id
            };
            return oauthdb.saveAuthorizationCode(authCode).then(authorizationCode => {
                return resolve({
                    authorizationCode: authorizationCode.authorization_code,
                    expiresAt: authorizationCode.expires_at,
                    redirectUri: authorizationCode.redirect_uri,
                    scope: authorizationCode.scope,
                    client: {
                        id: authorizationCode.client_id
                    },
                    user: {
                        id: authorizationCode.user_id
                    }
                });
            }).catch(function(err) {
                reject(err);
            });
        });
    },

    //Invoked to save an access token and optionally a refresh token, depending on the grant type.
    saveToken: async (token, client, user) => {
        return new Promise((resolve, reject) => {
            // imaginary DB queries
            let fns = [
                oauthdb.saveAccessToken({
                    access_token: token.accessToken,
                    expires_at: token.accessTokenExpiresAt,
                    scope: token.scope,
                    client_id: client.id,
                    user_id: user.id
                }),
                oauthdb.saveRefreshToken({
                    refresh_token: token.refreshToken,
                    expires_at: token.refreshTokenExpiresAt,
                    scope: token.scope,
                    client_id: client.id,
                    user_id: user.id
                })
            ];
            return Promise.all(fns).then(results => {
                var data = {
                    accessToken: results[0].access_token,
                    accessTokenExpiresAt: results[0].expires_at,
                    refreshToken: results[1].refresh_token,
                    refreshTokenExpiresAt: results[1].expires_at,
                    scope: results[0].scope,
                    client: {
                        id: results[0].client_id
                    },
                    user: {
                        id: results[0].user_id
                    }
                };
                let key = config.redis.key_prefix + ':access_token:' + data.accessToken;
                redisClient.setex(key, Math.floor((new Date(data.accessTokenExpiresAt).getTime() - new Date().getTime())/1000), JSON.stringify(data));
                return resolve(data);
            }).catch(function(err) {
                reject(err);
            });
        });
    },

    //Invoked to check if the requested scope is valid for a particular client/user combination.
    validateScope: async (user, client, scope) => {
        return user.scope;
    //   return scope
    //     .split(' ')
    //     .filter(s => user.scope.split(' ').indexOf(s) >= 0)
    //     .join(' ');
    },
    
    //Invoked to retrieve the user associated with the specified client.
    getUserFromClient: client => {
        return oauthdb.queryUser({user_id: client.user_id});
    }
};