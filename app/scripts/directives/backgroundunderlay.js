'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:backgroundUnderlay
 * @description
 * # backgroundUnderlay
 */
angular.module('bierbendigerApp')
  .directive('backgroundUnderlay', function () {
    return {
      template: '<div class="backgroundUnderlay"></div>',
      restrict: 'E',
      replace:true,
      link: function postLink(scope, element, attrs) {
          element.css("background-color", attrs.backgroundColor);
          function update(){
               element.css({
                 "box-shadow": "inset 0px -0px " + ($(window).scrollTop() / element.height() * 100 + 10) + "px  -10px rgba(0,0,0,0.3)",
              });
          }
          $(window).scroll(update);
          update();
      }
    };
  });
