var app = angular.module('pickerApp');

app.controller('ConnectController', [
  '$scope',
  '$http',
  '$location',
  '$cookieStore',
  '$timeout',
  'flashesFactory',
  function ($scope, $http, $location, $cookieStore, $timeout, flashesFactory) {
    $scope.ready();

    var data = {
      // A labels array that can contain any sort of values
      labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      // Our series array that contains series objects or in this case series data arrays
      series: [
        [.9, .8, .6, .8, .7, .5, .7, .6, .5, .4, .5, .4],
        [.2, .2, .5, .2, .2, .6, .2, .2, .2, .3, .3, .2]
      ]
    };

    var options = {
      low: 0,
      showArea: true
    };

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.

    $timeout(function () {
      new Chartist.Line('.ct-chart', data, options);
    }, 100);

    $scope.clearJumbotron();
  }
]);
