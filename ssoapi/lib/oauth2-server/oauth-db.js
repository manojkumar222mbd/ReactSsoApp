const passwordHash = require('password-hash');
const db = require('./db');

const oathdb = {
    queryClient: params => { //client_id,  client_secret(optional)
    	return new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
				let sql = 'select id, redirect_uri, grant_types, user_id from oauth_clients';
				let values = [];
            	if(params.id) {
					sql += ' where id=?';
					values.push(params.id);
            	} else {
	            	sql += ' where client_id=?';
					values.push(params.client_id);
	            	if(params.client_secret && params.client_secret.trim()!='') {
	            		sql += ' and client_secret=?';
						values.push(params.client_secret);
	            	}
            	}
            	db.queryDb(connection, {sql, values})
	            .then(results => {
	            	db.returnDb(connection);
	                if(results && results.length>0) {
		                resolve({
		                    id: results[0].id,
		                    redirect_uris: results[0].redirect_uri,
		                    grants: results[0].grant_types.split(" "),
		                    user_id: results[0].user_id
		                });
		            } else {
		            	reject("Invalid client");
		            }
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            })
            .catch(err => {
            	reject(err);
            });
        });
    },
    queryUser: params => { //user_id
    	return new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
				let sql = 'select id, tenant_id, email as username, name, phone, scope, password from users';
				let values = [];
				sql += ' where is_deleted=0 and status=1';
				if(params.user_id) {
					sql += ' and id=?';
					values.push(params.user_id);
            	} else {
					sql += ' and email=?';
					values.push(params.username);           		
            	}
            	
            	db.queryDb(connection, {sql, values})
	            .then(results => {
	            	db.returnDb(connection);
	                if(results && results.length>0) {
						if(params.password) {
							if(passwordHash.verify(params.password, results[0].password)) {
								resolve(results[0]);
							} else {
								reject("Invalid User");		
							}
						} else {
							resolve(results[0]);
						}	
		            } else {
		            	reject("Invalid User");
		            }
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            })
            .catch(err => {
            	reject(err);
            });
        });
    },
    queryAccessToken: params => { // access_token
        return new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
            	let sql = 'select access_token, expires, scope, client_id, user_id from oauth_access_tokens where access_token=?';
            	db.queryDb(connection, {sql, values:[params.access_token]})
	            .then(results => {
	            	db.returnDb(connection);
	                if(results && results.length>0) {
	                	resolve({
		                    client_id: results[0].client_id,
		                    user_id: results[0].user_id,
		                    access_token: results[0].access_token,
		                    expires_at: results[0].expires,
		                    scope: results[0].scope
		                });
		            } else {
		            	reject("Invalid Access Token");
		            }
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            })
            .catch(err => {
            	reject(err);
            });
        });
    },
    queryAuthorizationCode: params => { //authorization_code
    	return new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
            	let sql = 'select client_id, user_id, authorization_code, expires, redirect_uri, scope from oauth_authorization_codes where authorization_code=?';
            	db.queryDb(connection, {sql, values:[params.authorization_code]})
	            .then(results => {
	            	db.returnDb(connection);
	                if(results && results.length>0) {
		                resolve({
		                    client_id: results[0].client_id,
		                    user_id: results[0].user_id,
		                    authorization_code: results[0].authorization_code,
		                    expires_at: results[0].expires,
		                    redirect_uri: results[0].redirect_uri,
		                    scope: results[0].scope
		                });
		            } else {
		            	reject("Invalid Authorization Code");
		            }
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            })
            .catch(err => {
            	reject(err);
            });
        });
    },
    deleteAuthorizationCode: params => { //authorization_code
    	return new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
            	let sql = 'delete from oauth_authorization_codes where authorization_code=?';
            	db.queryDb(connection, {sql, values:[params.authorization_code]})
	            .then(results => {
	            	db.returnDb(connection);
	                resolve();
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            })
            .catch(err => {
            	reject(err);
            });
        });
    },
    queryRefreshToken: params => { //refresh_token
    	return new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
            	let sql = 'select client_id, user_id, refresh_token, expires, scope from oauth_refresh_tokens where refresh_token=?';
            	db.queryDb(connection, {sql, values:[params.refresh_token]})
	            .then(results => {
	            	db.returnDb(connection);
	                if(results && results.length>0) {
		                resolve({
		                    client_id: results[0].client_id,
		                    user_id: results[0].user_id,
		                    refresh_token: results[0].refresh_token,
		                    expires_at: results[0].expires,
		                    scope: results[0].scope
		                });
		            } else {
		            	reject("Invalid Refresh Token");
		            }
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            })
            .catch(err => {
            	reject(err);
            });
        });
    },
	deleteRefreshToken: params => { //refresh_token
		let refreshTokenPromise = new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
            	let sql = 'delete from oauth_refresh_tokens where refresh_token=?';
            	db.queryDb(connection, {sql, values:[params.refreshToken]})
	            .then(results => {
	            	db.returnDb(connection);
	                resolve();
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            })
            .catch(err => {
            	reject(err);
            });
		});
		
		let accessTokenPromise = new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
            	let sql = 'delete from oauth_access_tokens where access_token=?';
            	db.queryDb(connection, {sql, values:[params.accessToken]})
	            .then(results => {
	            	db.returnDb(connection);
	                resolve();
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            })
            .catch(err => {
            	reject(err);
            });
		});
		
		return Promise.all([
			refreshTokenPromise,
			accessTokenPromise
		]);
    },
    saveAuthorizationCode: params => { //authorization_code, expires_at, redirect_uri, scope, client_id, user_id
    	return new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
            	let sql = 'insert into oauth_authorization_codes(authorization_code, expires, redirect_uri, scope, client_id, user_id) values(?, ?, ?, ?, ?, ?)';
            	db.queryDb(connection, {sql, values:[
						params.authorization_code,
						params.expires_at,
						params.redirect_uri,
						params.scope,
						params.client_id,
						params.user_id
					]
				})
	            .then(results => {
	            	db.returnDb(connection);
                    resolve({
	                    client_id: params.client_id,
	                    user_id: params.user_id,
	                    authorization_code: params.authorization_code,
	                    expires_at: params.expires_at,
	                    redirect_uri: params.redirect_uri,
	                    scope: params.scope
	                });
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            })
            .catch(err => {
            	reject(err);
            });
        });
    },
    saveAccessToken: params => { //access_token, expires_at, scope, client_id, user_id
    	return new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
            	let sql = 'insert into oauth_access_tokens(access_token, expires, scope, client_id, user_id) values(?, ?, ?, ?, ?)';
            	db.queryDb(connection, {sql, values:[
						params.access_token,
						params.expires_at,
						params.scope,
						params.client_id,
						params.user_id
					]
				})
	            .then(results => {
	            	db.returnDb(connection);
                    resolve({
	                    client_id: params.client_id,
	                    user_id: params.user_id,
	                    access_token: params.access_token,
	                    expires_at: params.expires_at,
	                    scope: params.scope
	                });
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            })
            .catch(err => {
            	reject(err);
            });
        });
    },
    saveRefreshToken: params => { //refresh_token, expires_at, scope, client_id, user_id
    	return new Promise((resolve, reject) => {
            db.getDb()
            .then(connection => {
            	let sql = 'insert into oauth_refresh_tokens(refresh_token, expires, scope, client_id, user_id) values(?, ?, ?, ?, ?)';
            	db.queryDb(connection, {sql, values: [
						params.refresh_token,
						params.expires_at,
						params.scope,
						params.client_id,
						params.user_id
					]
				})
	            .then(results => {
	            	db.returnDb(connection);
                    resolve({
	                    client_id: params.client_id,
	                    user_id: params.user_id,
	                    refresh_token: params.refresh_token,
	                    expires_at: params.expires_at,
	                    scope: params.scope
	                });
	            })
	            .catch(err => {
	            	db.returnDb(connection);
	            	reject(err);
	            });
            });
        });
    }
};

module.exports = oathdb;