'use strict';

/**
 * @ngdoc service
 * @name bierbendigerApp.BierbendigerService
 * @description
 * # BierbendigerService
 * Factory in the bierbendigerApp.
 */
angular.module('bierbendigerApp')
  .factory('BierbendigerService', function ($q, $http, apiAddress, auth, $mdToast, $rootScope, Upload, $linq) {
    var address = apiAddress.bierbendiger.address;
    function errorMessage(){
        $mdToast.showSimple("Es hed en Fehler geh bim Absende. Danke, Livio.");
    }
    function evalDateOfTodoEntries(){
        angular.forEach(cache.todoEntries, function(entry){
            if(!(entry.CreationDate instanceof Date)){
                entry.CreationDate = new Date(entry.CreationDate);
            }
            if(!(entry.ApplicationDate instanceof Date)){
                entry.ApplicationDate = new Date(entry.ApplicationDate);
            }
        });
    }
    var cache = {};
    $rootScope.$on('clearCache', function () {
        cache = {};
    });
    return {
      getTodoEntries: function () {
        var deferred = $q.defer();
        if(cache.todoEntries == undefined){
            $http({
                method: "GET",
                url: address + "todoentry",
                headers: {
                    'Authorization': auth.getUser().Token.Value
                }
            }).success(function(data){
                cache.todoEntries = data;
                evalDateOfTodoEntries();
                deferred.resolve(cache.todoEntries);
            }).error(function(data){
                errorMessage();
                deferred.reject();
            });
        } else {
            evalDateOfTodoEntries();
            deferred.resolve(cache.todoEntries);
        }
        return deferred.promise;
      },
      voteTodoEntry :function(upvote, todoEntryId){
        var deferred = $q.defer();
        return $http({
            method: "POST",
            url: address + "todoentry/vote",
            data:{
                "UpVoted": upvote,
                "TodoEntryId": todoEntryId
            },
            headers: {
                'Authorization': auth.getUser().Token.Value
            }
        });
        return deferred.promise;
      },
      saveTodoEntry :function(entry){
        var deferred = $q.defer();
        $http({
            method: "POST",
            url: address + "todoentry/create",
            data:entry,
            headers: {
                'Authorization': auth.getUser().Token.Value
            }
        }).success(function(data){
            if(data.Status){
                if(cache.todoEntries == undefined){
                    cache.todoEntries = [];
                }
                data.Record.Karma = 0;
                cache.todoEntries.push(data.Record);
                $rootScope.$broadcast('todoEntriesUpdated');
            }
            deferred.resolve(data);
        }).error(function(data){
            deferred.reject();
            errorMessage();
        });
        return deferred.promise;
      },
      finishTodoEntry:function(data){
          var deferred = $q.defer();
          console.log(data);
          Upload.upload({ 
              url: address + "todoentry/finish",
              data: {
                "entryId": data.entryId,
                "file": data.file  
              },
              headers: {
                  'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                  'Authorization': auth.getUser().Token.Value
              }
          }).then(function(data){
              console.log(data);
              deferred.resolve(data);
          }, function(){
              deferred.reject();
              errorMessage();
          });
          return deferred.promise;
      },
      saveEntryOfTheDay:function(message){
        var deferred = $q.defer();
        $http({
            method: "POST",
            url: address + "entryoftheday/create",
            data:{
                Message: message
            },
            headers: {
                'Authorization': auth.getUser().Token.Value
            }
        }).success(function(data){
            deferred.resolve(data);
        }).error(function(data){
            deferred.reject();
            errorMessage();
        });
        return deferred.promise;
      },
      getUserCount:function(){
        var deferred = $q.defer();
        if(cache.userCount == undefined){
            $http({
                method: "GET",
                url: address + "public/user-count",
            }).success(function(data){
                deferred.resolve(data);
                cache.userCount = data;
            }).error(function(data){
                deferred.reject();
                errorMessage();
            });
        } else {
            deferred.resolve(cache.userCount);
        }
        return deferred.promise;
      }
    };
  });
