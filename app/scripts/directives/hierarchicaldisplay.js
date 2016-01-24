'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:hierarchicalDisplay
 * @description
 * # hierarchicalDisplay
 */
angular.module('bierbendigerApp')
    .directive('hierarchicalDisplay', function ($timeout) {
        function fadeIn(element) {
            if(element != null){
                window.setTimeout(function () {
                    $(element).addClass("fadeIn");
                    fadeIn(element.next());
                }, 100);
            }
            
        }
        return {

            link: function postLink(scope, element, attrs) {
                scope.$watch(function () { return element.attr('hierarchical-display'); }, function (value) {
                    if (value == "true") {
                        fadeIn($(element.children().first()));
                    }

                });
            }
        };
    });
