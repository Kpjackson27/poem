'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.poem').factory('Poems', ['$resource',
  function($resource) {
    return $resource('api/poems/:poemId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
