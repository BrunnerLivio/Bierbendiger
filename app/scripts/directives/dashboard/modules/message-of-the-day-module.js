'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:messageOfTheDayModule
 * @description
 * # messageOfTheDayModule
 */
angular.module('bierbendigerApp')
  .directive('messageOfTheDayModule', function () {
    return {
      templateUrl: 'views/templates/dashboard/modules/msg-of-the-day-module.html',
      restrict: 'E',
      transclude: false,
      link: function postLink(scope, element, attrs) {
      },
      controller:function($scope, BierbendigerService){
          $scope.loadingStatus = 0;
          $scope.save = function(form){
            $scope.loadingStatus = 1;
            BierbendigerService.saveEntryOfTheDay($scope.message).then(function(){
                $scope.loadingStatus = 2;
                $scope.message = "";
                form.$rollbackViewValue();
                form.$setPristine();
                form.$setUntouched();
            }, function(){
                $scope.loadingStatus = 3;
            });
            
          }
          
      }
    };
  });
