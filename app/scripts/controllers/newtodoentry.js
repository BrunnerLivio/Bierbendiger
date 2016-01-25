'use strict';

/**
 * @ngdoc function
 * @name bierbendigerApp.controller:NewentryCtrl
 * @description
 * # NewentryCtrl
 * Controller of the bierbendigerApp
 */
angular.module('bierbendigerApp')
  .controller('NewtodoentryCtrl', function ($scope, googleGeocodingService, BierbendigerService,$location, $linq, $rootScope) {
       $scope.viewId="NewtodoentryCtrl";
       $scope.selectedEntry = {};
       if($rootScope.$routeParams.todoEditId){
           
           $scope.selectedEntry = $linq.Enumerable().From($scope.entries)
            .Where(function(x){
                return x.Id == $rootScope.$routeParams.todoEditId;
            })
            .First();
            console.log($scope.selectedEntry);
       }
       $scope.newTodoEntry = $scope.selectedEntry;
       
       $scope.map = { 
           visibility:false,
            center: {
                latitude: 0,
                longitude: 0
            },
            zoom:8,
            markers: [],
        }
        BierbendigerService.getUserCount().then(function(data){
            $scope.UserCount = data.amount;
        });
        $scope.close = function(){
            $location.path("/dashboard");
        };
        $scope.saveEntry = function(){
            console.log($scope.newTodoEntry);
            $location.path("/dashboard");
            BierbendigerService.saveTodoEntry($scope.newTodoEntry).then(function(data){});
        }
        $scope.selectedLocationChange = function(location){
            $scope.map = { 
                visibility:true,
                center: {
                    latitude: location.geometry.location.lat,
                    longitude: location.geometry.location.lng
                },
                zoom:8,
                markers:[
                    {
                        latitude: location.geometry.location.lat,
                        longitude: location.geometry.location.lng,
                        id: 0,
                        title: location
                    }
                ]
            };
        }
        $scope.searchLocation = function(location){
           googleGeocodingService.getAddress(location)
           .then(function(data){
               $scope.locationItems = data.results;
           });
        }
  });
