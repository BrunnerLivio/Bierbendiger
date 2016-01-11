'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:userModule
 * @description
 * # userModule
 */
angular.module('bierbendigerApp')
  .directive('userModule', function () {
    return {
      templateUrl: 'views/templates/dashboard/modules/user-module.html',
      restrict: 'E',
      transclude: false,
      link: function postLink(scope, element, attrs) {
      },
      controller:function($scope, $location, auth){
          $scope.logout = function(){
              auth.logout();
              $location.path("/");
          }
      }
    };
  });
