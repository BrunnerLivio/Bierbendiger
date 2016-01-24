'use strict';

/**
 * @ngdoc function
 * @name bierbendigerApp.controller:TodoentrydetailCtrl
 * @description
 * # TodoentrydetailCtrl
 * Controller of the bierbendigerApp
 */
angular.module('bierbendigerApp')
  .controller('TodoentrydetailCtrl', function ($scope, $location, $linq, $rootScope) {
    $scope.viewId ="TodoentrydetailCtrl";
    $scope.close = function(){
        $location.path("/dashboard");
    };
    $scope.selectedEntry = $linq.Enumerable().From($scope.entries)
        .Where(function(x){
            return x.Id == $rootScope.$routeParams.todoId;
        })
        .First();
    $scope.landscapeMode = $scope.selectedEntry.Message;
  });
