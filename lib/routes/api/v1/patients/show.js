// Libraries.
var _ = require('underscore');

// Application code.
var Patients = require('../../../../patients');

module.exports = function (req, res) {
  var id = req.params.id;
  var patients = new Patients();

  if (_(id).isEmpty()) {
    res.status(401);
    res.send({
      error: 'ID must be provided.'
    });
    return;
  }

  patients.signin(function (err, token) {
    patients.getPatient(token, id, function (err, data) {
      res.send(data[0].getpatientinfo[0]);
    });
  });
};

