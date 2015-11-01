var app = angular.module('pickerApp');

app.controller('RecordsController', [
  '$scope',
  '$http',
  '$location',
  'flashesFactory',
  function ($scope, $http, $location, flashesFactory) {
    $scope.clearJumbotron();

    $('.option-select').on('click', function() {
      if ( $(this).children().children().is('#dr') ) {
        $('#drs').addClass('active');
        $('#hospitals').removeClass('active');
        $('#immunizations').removeClass('active');
      } else if ( $(this).children().children().is('#hospital') ) {
        $('#drs').removeClass('active');
        $('#hospitals').addClass('active');
        $('#immunizations').removeClass('active');
      } else if ( $(this).children().children().is('#immunization') ) {
        $('#drs').removeClass('active');
        $('#hospitals').removeClass('active');
        $('#immunizations').addClass('active');
      }
    });

    $scope.patientId = '32';
    $scope.patient = null;

    $http
      .get('/api/v1/patients/' + $scope.patientId + '.json')
      .then(function (response) {
        $scope.patient = response.data;

        $scope.ready();
      })
      .catch(function (response) {
        var message = (response.data && response.data.error) ?
          response.data.error :
          'An error occurred.';

        flashesFactory.add('danger', message);
      });
  }
]);
