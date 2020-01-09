var pool = require('../databases');

const db = {
	getDb: () => {
		return new Promise((resolve, reject) => {
	        pool.getDb((err, connection) => {
			  if (err) {
			  	return reject(err);
			  }
			  resolve(connection);
			});
	    });
	},

	returnDb: (connection) => {
		return new Promise((resolve, reject) => {
			pool.returnDb(connection, (err) => {
				if (err) {
				 	return reject(err);
				}
				resolve();
			});
	    });
	},

	queryDb: (connection, sql) => {
		return new Promise((resolve, reject) => {
			pool.queryDb(connection, sql, function (err, results) {
				if(err) {
					return reject(err);
				}
				resolve(results);
			});
	    });
	}
}

module.exports = db;