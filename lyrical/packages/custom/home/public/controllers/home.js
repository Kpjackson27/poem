'use strict';

/* jshint -W098 */
angular.module('mean.home',['mean.system'])
.config(['$viewPathProvider', function($viewPathProvider){
	$viewPathProvider.override('system/views/index.html', 'home/views/index.html');
}])
.controller('HomeController', ['$scope', 'Global', 'Home',
  function($scope, Global, Home) {
    $scope.global = Global;
    $scope.package = {
      name: 'home'
    };
  }
]);
