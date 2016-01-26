'use strict';

/**
 * @ngdoc function
 * @name bierbendigerApp.controller:PublicCtrl
 * @description
 * # PublicCtrl
 * Controller of the bierbendigerApp
 */
angular.module('bierbendigerApp')
  .controller('PublicCtrl', function ($scope, BierbendigerService, $location) {
      $scope.viewId="PublicCtrl";
      BierbendigerService.getPublicTodoEntries().success(function(data){
         $scope.entries = data; 
      });
      $scope.location = function(path){
          $location.path(path);
      }
  });
