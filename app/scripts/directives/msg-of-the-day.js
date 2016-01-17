'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:msgOfTheDay
 * @description
 * # msgOfTheDay
 */
angular.module('bierbendigerApp')
  .directive('msgOfTheDay', function () {
    return {
      templateUrl: 'views/templates/msg-of-the-day.html',
      restrict: 'E',
      transclude: false,
      link: function postLink(scope, element, attrs) {
          var $preText = element.find(".preText"),
              $quoteBox = element.find(".quoteBox");
          function updateUI(){
              if($(window).scrollTop() + $(window).height() + element.height() * 0.25 >= $preText.offset().top) {
                 console.log("asdf");
                 $quoteBox.addClass("fadeIn");
             }
          }
          $(window).scroll(updateUI);
          updateUI();
      },
      controller:function($scope, BierbendigerService){
          
          function reload(){
            BierbendigerService.getMessageOfTheDay().success(function(data){
                $scope.messageOfTheDay = data; 
            });
          }
          reload();
          $scope.reload = reload;
      }
    };
  });
