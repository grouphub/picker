// Libraries.
var _ = require('underscore');
var Promise = require('bluebird');
var nconf = require('nconf')

// Route definition.
module.exports = function (req, res) {
  nconf.argv().env().file({ file: './config/sendgrid.json' });

  var sendgrid  = require('sendgrid')(
    nconf.get('Sendgrid:user'), nconf.get('Sendgrid:password')
  );

  console.log(req.query);

  var email     = {
    to      : req.user,
    from    : 'info@grouphub.com',
    subject : 'Application Registration',
    text    : 'Your application has been registered successfully'
  };

  sendgrid.send(email, function(err, json) {
    if(err){
      console.error(err);
      res.status(500);
      res.send(
        {error: 'There was an error while sending confirmation email.'}
      );
    }else{
      res.status(200);
      res.send('Ok');
    }
  });
};
