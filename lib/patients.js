var request = require('request');

var config = require('./config');

function Patients () {

}

Patients.prototype.signin = function (callback) {
  console.log('Signing in to Allscripts...');

  var options = {
    method: 'POST',
    url: config.allscriptsEhrEndpoint + '/json/GetToken',
    body: JSON.stringify({
      'Username': config.allscriptsUser,
      'Password': config.allscriptsPassword
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  request(options, function (err, response, body) {
    if (err) {
      console.error('Received an error from Allscripts...');
      console.error(err);

      callback(err);

      return;
    }

    console.log('Received a token from Allscripts (' + body + ')...');

    callback(null, body);
  });
};

Patients.prototype.getInfo = function (token, callback) {
  console.log('Getting info with token ' + token + '...');

  var options = {
    method: 'POST',
    url: config.allscriptsEhrEndpoint + '/json/MagicJson',
    body: JSON.stringify({
      'Action': 'GetServerInfo',
      'AppUserID': 'jmedici',
      'Appname': config.allscriptsName,
      'PatientID': '',
      'Token': token,
      'Parameter1': '',
      'Parameter2': '',
      'Parameter3': '',
      'Parameter4': '',
      'Parameter5': '',
      'Parameter6': '',
      'Data': ''
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  request(options, function (err, response, body) {
    if (err) {
      console.error('Received an error from Allscripts...');
      console.error(err);

      callback(err);

      return;
    }

    console.log('Received a response from Allscripts...');

    callback(null, JSON.parse(body));
  });
};

Patients.prototype.getPatient = function (token, patientId, callback) {
  console.log('Getting patient data with token ' + token + '...');

  var options = {
    method: 'POST',
    url: config.allscriptsEhrEndpoint + '/json/MagicJson',
    body: JSON.stringify({
      'Action': 'GetPatient',
      'AppUserID': 'jmedici',
      'Appname': config.allscriptsName,
      'PatientID': patientId,
      'Token': token,
      'Parameter1': '',
      'Parameter2': '',
      'Parameter3': '',
      'Parameter4': '',
      'Parameter5': '',
      'Parameter6': '',
      'Data': ''
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  request(options, function (err, response, body) {
    if (err) {
      console.error('Received an error from Allscripts...');
      console.error(err);

      callback(err);

      return;
    }

    console.log('Received a response from Allscripts...');

    callback(null, JSON.parse(body));
  });
};

module.exports = Patients;

