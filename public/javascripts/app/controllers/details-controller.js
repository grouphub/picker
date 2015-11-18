var app = angular.module('pickerApp');

app.controller('DetailsController', [
  '$scope',
  '$cookieStore',
  '$http',
  '$location',
  function ($scope, $cookieStore, $http, $location) {
    $scope.getNumber = function (number) {
      var array = []
      var i = 0;

      for (; i < number; i++) {
        array.push(i);
      }

      return array;
    }

    $scope.addDependent = function () {
      $scope.form.numberOfDependents++;
    };

    $scope.apply = function () {
      $scope.loading();

      $http
        .get('/api/v1/enrollments.json', {'user' : picker.user.email})
        .then(function (response) {
          $location.path('/success')
        })
        .catch(function (response) {

        });
    };

    $scope.form = {
      previousCoverage: 'No',
      parentOrLegalGuardian: 'No',
      authorizedRepresentative: 'No',
      numberOfDependents: 0
    };

    $scope.clearJumbotron();

    $scope.ready();
  }
]);

