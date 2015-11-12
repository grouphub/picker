// Libraries.
var _ = require('underscore');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

// Route definition.
module.exports = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var users = req.database.get().users;
  var user;

  if (_(email).isEmpty()) {
    res.status(401);
    res.send({
      error: 'Email must be provided.'
    });
    return;
  }

  if (_(password).isEmpty()) {
    res.status(401);
    res.send({
      error: 'Password must be provided.'
    });
    return;
  }

  user = {
    email: email,
    password: bcrypt.hashSync(password)
  }

  users.find({email: user.email})
    .then(function(users){
      if(users.length){
        console.error('Cannot create user; user already registered.');
        return res.send(403, {error: 'User already registered.'});
        closeDatabase();
      }

      // Insert user.
      saveUser();

    });

    function saveUser(user) {
      users.insert(user)
      .then(function () {
        return new Promise(function (resolve, reject) {
          res.send(JSON.stringify({
            user: user
          }));

          console.log('User created.');
          resolve();
        });
      })
      .catch(function (error) {
        res.status(500).end();

        console.error(error);
      })
      .then(function () {
        closeDatabase();
      });
    };

    function closeDatabase(){
      database.close()
    };
};

