'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:ngVisible
 * @description
 * # ngVisible
 */
angular.module('bierbendigerApp')
  .directive('ngVisible', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$watch(attributes.ngVisible, function(value){
                element.css('visibility', value ? 'visible' : 'hidden');
            });
        }
    };
});