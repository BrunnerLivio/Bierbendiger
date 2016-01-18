'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:mdSpoiler
 * @description
 * # mdSpoiler
 */
angular.module('bierbendigerApp')
  .directive('mdSpoilerTitle', function () {
    return {
      restrict: 'E',
      transclude:true,
      template:"<md-button flex><span ng-transclude></span></md-button>",
      link: function postLink(scope, element, attrs) {
      }
    };
  });
