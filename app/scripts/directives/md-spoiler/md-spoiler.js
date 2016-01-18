'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:mdSpoiler
 * @description
 * # mdSpoiler
 */
angular.module('bierbendigerApp')
  .directive('mdSpoiler', function () {
    return {
      restrict: 'E',
      transclude:true,
      template: "<div ng-transclude></div>",
      link: function postLink(scope, element, attrs) {
          element.find("md-spoiler-title").click(function(){
              element.find("md-spoiler-title .md-button").toggleClass("md-raised");
              element.find("md-spoiler-body .spoilerBody").slideToggle();
          });
      }
    };
  });
