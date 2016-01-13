'use strict';

/**
 * @ngdoc function
 * @name bierbendigerApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the bierbendigerApp
 */
angular.module('bierbendigerApp')
  .controller('DashboardCtrl', function ($scope, $timeout, $mdSidenav, auth, $mdMedia, createTodoEntry, $location, $rootScope, $routeParams) {
    $scope.viewId="DashboardCtrl";
    $scope.user = auth.getUser();
    $scope.triggerTransition = createTodoEntry;
    
    $rootScope.$routeParams = $routeParams;
    
    
    $scope.$watch(function() { return $mdMedia('xs'); }, function(sm) {
        console.log(sm);
        if(sm){
            $scope.dashboardView = "views/templates/dashboard/dashboard-mobile.html";
        } else {
            $scope.dashboardView = "views/templates/dashboard/dashboard-desktop.html";
        }
    });
    
    $scope.openNewEntryModal = function(){
        $location.path("/dashboard/create-todoentry");
    };
  });
