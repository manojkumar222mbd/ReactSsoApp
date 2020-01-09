var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var cors = require('cors')


var app = express();

const OAuth2Server = require('oauth2-server');
app.oauth = new OAuth2Server({
    model: require('./lib/oauth2-server/oauth-model').model,
    grants: ['password'],
    debug: true,
    requireClientAuthentication: {
        password: false
    }
});
process.app = app;

var swaggerUi = require('swagger-ui-express');
var YAML = require('yamljs');
var swaggerDocument = YAML.load('./nodeapi-swagger.yaml');
var options = {
        customCss: '.swagger-ui .topbar { display: none }',
        swaggerOptions: {
            validatorUrl : null,
            title: 'API'
        },
        customSiteTitle: 'API'
    };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', 3000);
if(process.env && process.env.NODE_ENV!='test') {
  app.use(logger('dev'));
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/', require('./routes/index'));
app.use('/admin/users', require('./routes/user'));
app.use('/admin/groups', require('./routes/group'));
app.use('/oauth', require('./routes/oauth'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
