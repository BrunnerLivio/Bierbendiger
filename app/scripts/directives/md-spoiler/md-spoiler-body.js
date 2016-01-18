'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:mdSpoiler
 * @description
 * # mdSpoiler
 */
angular.module('bierbendigerApp')
  .directive('mdSpoilerBody', function () {
    return {
      restrict: 'E',
      transclude:true,
      template:"<div class=\"spoilerBody\" ng-transclude layout-padding></div>",
      link: function postLink(scope, element, attrs) {
      }
    };
  });
