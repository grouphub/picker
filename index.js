var app = require('./lib/app');
var config = require('./lib/config');

app.listen(config.serverPort, function () {
  console.log('App is listening at "http://0.0.0.0:%s" in the "%s" environment.', config.serverPort, config.environment);
}) ;

