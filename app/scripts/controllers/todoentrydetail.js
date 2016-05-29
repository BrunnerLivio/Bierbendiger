'use strict';

/**
 * @ngdoc function
 * @name bierbendigerApp.controller:TodoentrydetailCtrl
 * @description
 * # TodoentrydetailCtrl
 * Controller of the bierbendigerApp
 */
angular.module('bierbendigerApp')
  .controller('TodoentrydetailCtrl', function ($scope, $location, $linq, $rootScope, googleGeocodingService, BierbendigerService) {
    $scope.viewId ="TodoentrydetailCtrl";
    $scope.close = function(){
        $location.path("/dashboard");
    };
    BierbendigerService.getTodoEntries().then(function(data){
        $scope.entries = data;
        $scope.selectedEntry = $linq.Enumerable().From(data)
            .Where(function(x){
                return x.Id == $rootScope.$routeParams.todoId;
            })
            .First();
        $scope.landscapeMode = $scope.selectedEntry.Message || $scope.selectedEntry.Destination || $scope.selectedEntry.ApplicationDate;
        searchLocation($scope.selectedEntry.Destination);
            
    });
    
    function searchLocation(location){
           googleGeocodingService.getAddress(location)
           .then(function(data){
               if(data.status == "OK"){
                   $scope.map = { 
                        visibility:true,
                        center: {
                            latitude: data.results[0].geometry.location.lat,
                            longitude: data.results[0].geometry.location.lng
                        },
                        zoom:8,
                        markers:[
                            {
                                latitude: data.results[0].geometry.location.lat,
                                longitude: data.results[0].geometry.location.lng,
                                id: 0,
                                title: location
                            }
                        ]
                    };
               }
               
           }, function(data){
           });
    };
  });
