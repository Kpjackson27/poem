'use strict';

//Setting up route
angular.module('mean.poem').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/api/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all poems', {
        url: '/poems',
        templateUrl: '/poem/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create poem', {
        url: '/poems/create',
        templateUrl: '/poem/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit poem', {
        url: '/poems/:poemId/edit',
        templateUrl: '/poem/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('poem by id', {
        url: '/poems/:poemId',
        templateUrl: '/poem/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
