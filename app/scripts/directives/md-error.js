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
            link: function postLink(scope, element, attrs) {
                scope.$watch(attrs.show, function (value) {
                    if(value){
                        element.slideDown();
                    } else {
                        element.slideUp();
                    }
                });
            }
        };
    });
