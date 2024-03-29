var app = angular.module('pickerApp');

app.controller('OnboardingController', [
  '$scope',
  '$http',
  '$location',
  '$cookieStore',
  'flashesFactory',
  function ($scope, $http, $location, $cookieStore, flashesFactory) {
    var age = '35';
    var zipcode = '85001';

    $scope.name = function (doctor) {
      var middleName = (doctor.profile.middle_name && doctor.profile.middle_name.length === 1) ?
        (doctor.profile.middle_name + '.') :
        (doctor.profile.middle_name);

      var names = [doctor.profile.first_name, middleName, doctor.profile.last_name];
      var joinedName = _(names).compact().join(' ');

      if (doctor.profile.title) {
        joinedName += ', ' + doctor.profile.title;
      }

      return joinedName;
    };

    $scope.averageRating = function (doctor) {
      var rating = _(doctor.ratings).reduce(function (acc, rating) {
        acc += rating.rating;
        return acc;
      }, 0) / doctor.ratings.length;

      if (isNaN(rating)) {
        return 0;
      }

      return rating;
    };

    $scope.rate = function (doctor) {
      var list = [];
      var rating;

      if (!doctor.ratings || !doctor.ratings[0]) {
        return;
      }

      // Average rating
      rating = $scope.averageRating(doctor);

      if (!rating) {
        return;
      }

      for (var i = 0; i < Math.floor(rating); i++) {
        list.push('<i class="fa fa-star"></i>');
      }

      if (Math.floor(rating) !== Math.round(rating)) {
        list.push('<i class="fa fa-star-half"></i>');
      }

      return list.join('');
    };

    $scope.specialties = function (doctor) {
      return _(doctor.specialties)
        .map(function (specialty) {
          return specialty.name;
        })
        .join(', ');
    };

    $scope.languages = function (doctor) {
      return _(doctor.profile.languages)
        .map(function (language) {
          return language.name;
        })
        .join(', ');
    }

    $scope.practices = function (doctor) {
      return _(doctor.practices)
        .map(function (practice) {
          var addressData = practice.visit_address;
          var str = '';

          if (addressData.street) {
            str += addressData.street + '<br>';
          }

          if (addressData.street2) {
            str += addressData.street2 + '<br>';
          }

          str += addressData.city + ', ' + addressData.state + ' ' + addressData.zip;

          return '<p class="practice">' + str + '</p>';
        })
        .join(' ');
    }

    $scope.currentDoctor = undefined;
    $scope.isHovering = true;
    $scope.doctorClicked = function (doctor) {
      $scope.currentDoctor = doctor;
      $scope.isHovering = false;
    };
    $scope.doctorHovered = function (doctor) {
      if ($scope.isHovering) {
        $scope.currentDoctor = doctor;
      }
    };

    $scope.form = {
      query: undefined
    };
    $scope.search = function () {
      if ($scope.form.query.length === 0) {
        $scope.topDoctors = $scope.plans.doctors.slice($scope.offset, $scope.offset + 10);
        return;
      }

      $scope.topDoctors = _($scope.plans.doctors).select(function (doctor) {
        return $scope.name(doctor).match(new RegExp($scope.form.query, 'i'));
      });
    }

    $scope.previousDoctors = function () {
      if ($scope.offset === 0) {
        return;
      }

      $scope.offset -= 10;
      $scope.topDoctors = $scope.plans.doctors.slice($scope.offset, $scope.offset + 10);
    };

    $scope.nextDoctors = function () {
      if ($scope.offset + 10 > $scope.plans.doctors.length) {
        return;
      }

      $scope.offset += 10;
      $scope.topDoctors = $scope.plans.doctors.slice($scope.offset, $scope.offset + 10);
    };

    $scope.submit = function () {
      $cookieStore.put('doctor', JSON.stringify($scope.currentDoctor));

      $location.path('/recommendations')
    };

    $scope.skip = function () {
      $cookieStore.put('doctor', undefined);

      $location.path('/recommendations')
    };

    age = '35';
    zipcode = '85001';

    if (!picker.user) {
      // ...
    }

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

        console.log($scope.plans);

        $scope.ready();
      })
      .catch(function (response) {
        var message = (response.data && response.data.error) ?
          response.data.error :
          'An error occurred.';

        flashesFactory.add('danger', message);
      });
    

    $scope.clearJumbotron();

    $scope.ready();

    // Just to move the highlighted plan around
    $('.option-select').on('click', function() {
      var count = $('.option-select.active').length;
      if ( $(this).hasClass('active') ) {
        count--;
      } else {
        count++;
      }
      if ( count < 2 ) {
        $('.plan').removeClass('highlight');
        $('#planA').addClass('highlight');
      } else if ( count < 4 ) {
        $('.plan').removeClass('highlight');
        $('#planB').addClass('highlight');
      } else {
        $('.plan').removeClass('highlight');
        $('#planC').addClass('highlight');
      } 
    });
  }
]);
