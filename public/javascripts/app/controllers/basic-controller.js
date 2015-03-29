var app = angular.module('pickerApp');

app.controller('BasicController', [
  '$scope',
  '$cookieStore',
  '$location',
  'flashesFactory',
  function ($scope, $cookieStore, $location, flashesFactory) {
    $scope.form = {
      age: undefined,
      zipcode: undefined
    };

    $scope.submit = function () {
      if (_($scope.form.age).isEmpty()) {
        flashesFactory.add('danger', 'Age must be provided.');
        return;
      }

      if (_($scope.form.zipcode).isEmpty()) {
        flashesFactory.add('danger', 'Zip code must be provided.');
        return;
      }

      if (!$scope.form.age.match(/\d+/)) {
        flashesFactory.add('danger', 'Please enter a valid age.');
        return;
      }

      if (!$scope.form.zipcode.match(/\d\d\d\d\d/)) {
        flashesFactory.add('danger', 'Please enter a valid zip code.');
        return;
      }

      picker.globals.age = $scope.form.age;
      picker.globals.zipcode = $scope.form.zipcode;

      $location.path('/doctors')
    };

    $scope.clearJumbotron();

    $scope.ready();
  }
]);

