var app = angular.module('pickerApp');

app.controller('RecommendationsController', [
  '$scope',
  '$cookieStore',
  '$http',
  '$location',
  'flashesFactory',
  function ($scope, $cookieStore, $http, $location, flashesFactory) {
    var age = picker.globals.age;
    var zipcode = picker.globals.zipcode;

    $scope.topPlans = undefined;

    $scope.premium = function (plan) {
      return _(plan.premiums).chain()
        .select(function (premium) {
          return premium.adults === 1 && premium.children === 0;
        })
        .sortBy(function (premium) {
          premium.age;
        })
        .reverse()
        .find(function (premium) {
          return premium.age <= age;
        })
        .value();
    };

    $scope.premiumCost = function (plan) {
      var premium = $scope.premium(plan) || {};

      return premium.cost;
    };

    $scope.tradingPartner = function (plan) {
      return _($scope.plans.tradingPartners).findWhere({
        id: plan.trading_partner_id
      });
    }

    $scope.tradingPartnerName = function (plan) {
      var tradingPartner = $scope.tradingPartner(plan) || {};

      return tradingPartner.name;
    }

    $scope.pickPlan = function (plan) {
      picker.globals.plan = JSON.stringify(plan);

      $location.path('/details')
    }

    if (!$scope.plans) {
      if (_(age).isEmpty()) {
        flashesFactory.add('danger', 'Age must be provided.');
        return;
      }

      if (_(zipcode).isEmpty()) {
        flashesFactory.add('danger', 'Zip code must be provided.');
        return;
      }

      $http
        .get('/api/v1/plans.json?zipcode=' + zipcode + '&age=' + age)
        .then(function (response) {
          $scope.plans = response.data;
          window.picker.plans = $scope.plans;

          $scope.topPlans = $scope.plans.plans.slice(0, 3);

          $scope.ready();
        })
        .catch(function (response) {
          var message = (response.data && response.data.error) ?
            response.data.error :
            'An error occurred.';

          flashesFactory.add('danger', message);
        });
    } else {
      $scope.ready();
    }

    $scope.clearJumbotron();
  }
]);

