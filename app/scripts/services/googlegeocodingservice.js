'use strict';

/**
 * @ngdoc service
 * @name bierbendigerApp.googleGeocoding
 * @description
 * # googleGeocoding
 * Factory in the bierbendigerApp.
 */
angular.module('bierbendigerApp')
  .factory('googleGeocodingService', function ($http, apiAddress, $q) {
    return {
      getAddress: function (address) {
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: apiAddress.googleGeocoding.address + "geocode/json",
            params: {
                "address": address,
                "key": apiAddress.googleGeocoding.key
            }
        }).success(function(data){
          deferred.resolve(data); 
        }).error(function(data){
          deferred.reject();              
        });
        return deferred.promise;
      }
    };
  });
