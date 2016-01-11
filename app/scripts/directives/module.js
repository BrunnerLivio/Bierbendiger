'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:module
 * @description
 * # module
 */
angular.module('bierbendigerApp')
  .directive('module', function () {
    return {
      templateUrl: 'views/templates/module.html',
      restrict: 'E',
      transclude: true,
      link: function postLink(scope, element, attrs) {
      }
    };
  });
