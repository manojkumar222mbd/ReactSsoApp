 var moment = require('moment');

 exports.dateConfig = function(callback) {
 
  callback(null, moment().format('YYYY-MM-DD hh:mm:ss')) ;
};
