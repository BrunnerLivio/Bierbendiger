'use strict';

/**
 * @ngdoc service
 * @name bierbendigerApp.auth
 * @description
 * # auth
 * Service in the bierbendigerApp.
 */
angular.module('bierbendigerApp')
  .factory('auth', function (apiAddress, $http, $cookies, $q, $rootScope) {
    var user;
    function login(username, password){
      var deferred = $q.defer();
      $http({
          method: "post",
          url: apiAddress.bierbendiger.address + "user/login",
          headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {username: username, password: password},
      }).success(function(data){
        deferred.resolve(data);
        console.log(data);
        $cookies.putObject("user", data);
      }).error(function(data){
        deferred.reject();
      });
      return deferred.promise;
    }
    function isAuthenticated(){
        
      user = getUser();
      if(user != undefined){
        return true;
      }
      return false;
    }
    function getUser(){
      if(user == undefined){
        if($cookies.getObject("user") != undefined){
            user = $cookies.getObject("user").user;
        }
      } 
      return user;
    }
    function logout(){
        user = undefined;
        $cookies.remove("user");
        $rootScope.$broadcast("clearCache");
    }
    return {
      login: login,
      isAuthenticated:isAuthenticated,
      getUser:getUser,
      logout:logout
    }
  });
