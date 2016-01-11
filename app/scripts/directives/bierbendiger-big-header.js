'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:bierbendigerBigHeader
 * @description
 * # bierbendigerBigHeader
 */
angular.module('bierbendigerApp')
  .directive('bierbendigerBigHeader', function () {
    return {
      templateUrl: 'views/templates/bierbendiger-big-header.html',
      restrict: 'E',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        function update(){
          var opacity = $(window).scrollTop() / ($(window).height() / 100 * 50);
          element.find("#pictureBlur").css({
            "opacity": opacity
          });
        }
        $(window).scroll(update);
        $("body").bind('touchmove',update);
      }
    };
  });
