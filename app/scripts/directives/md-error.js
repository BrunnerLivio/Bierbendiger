'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:mdError
 * @description
 * # mdError
 */
angular.module('bierbendigerApp')
    .directive('mdError', function () {
        return {
            templateUrl: 'views/templates/md-error.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                "show": "=show"
            },
            link: function postLink(scope, element, attrs) {
               
            }
        };
    });
