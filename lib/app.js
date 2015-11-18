// Libraries.
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongo = require('mongod');
var livereload = require('connect-livereload');

// Application Code.
var config = require('./config');

// Setup.
var app = express();

// App settings.
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

// App middleware.
app.use(express.static(__dirname + '/../public'));
app.use(livereload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(function (req, res, next) {
  req.config = config;

  next();
});
app.use(function (req, res, next) {
  req.database = {
    get: function () {
      return mongo(req.config.databaseUrl, req.config.databaseTables);
    }
  };

  next();
});

// ======
// Routes
// ======

// ----------
// API routes
// ----------

app.get('/api/v1/plans.json', require('./routes/api/v1/plans/index'));
app.get('/api/v1/enrollments.json', require('./routes/api/v1/enrollments/create'));
app.get('/api/v1/users.json', require('./routes/api/v1/users/index'));
app.get('/api/v1/users/:id.json', require('./routes/api/v1/users/show'));
app.post('/api/v1/users.json', require('./routes/api/v1/users/create'));
app.post('/api/v1/users/signin.json', require('./routes/api/v1/users/signin'));
app.delete('/api/v1/users/signin.json', require('./routes/api/v1/users/signout'));
app.get('/api/v1/patients/:id.json', require('./routes/api/v1/patients/show'));

// ----------------
// Front-end routes
// ----------------

app.get('*', require('./routes/front-end'));

module.exports = app;

