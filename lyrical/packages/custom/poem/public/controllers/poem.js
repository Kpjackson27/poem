'use strict';

angular.module('mean.poem').controller('PoemController', ['$scope', '$stateParams', '$location', 'Global', 'Poems', 'MeanUser',
  function($scope, $stateParams, $location, Global, Poems, MeanUser) {
    $scope.global = Global;
    $scope.hasAuthorization = function(poem) {
      if (!poem || !poem.user) return false;
      return MeanUser.isAdmin || poem.user._id === MeanUser.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var poem = new Poems({
          title: this.title,
          content: this.content
        });
        poem.$save(function(response) {
          $location.path('poems/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(poem) {
      if (poem) {
        poem.$remove(function(response) {
          for (var i in $scope.poems) {
            if ($scope.poems[i] === poems) {
        $scope.poems.splice(i,1);
            }
          }
          $location.path('poems');
        });
      } else {
        $scope.poem.$remove(function(response) {
          $location.path('poems');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var poem = $scope.poem;
        if(!poem.updated) {
          poem.updated = [];
  }
        poem.updated.push(new Date().getTime());

        poem.$update(function() {
          $location.path('poems/' + poem._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Poems.query(function(poems) {
        $scope.poems = poems;
      });
    };

    $scope.findOne = function() {
      Poems.get({
        poemId: $stateParams.poemId
      }, function(poem) {
        $scope.poem = poem;
      });
    };
  }
]);
