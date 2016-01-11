'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:finishButton
 * @description
 * # finishButton
 */
angular.module('bierbendigerApp')
  .directive('finishButton', function ($mdDialog, Upload, $mdMenu, $timeout, BierbendigerService, $rootScope) {
    return {
      templateUrl: 'views/templates/finish-button.html',
      restrict: 'E',
      controller: function($scope){
          $scope.file = {};
          $scope.openPopup = function($mdOpenMenu, $event){
              $mdOpenMenu($event);
          }
          $scope.fileSelect = function(){
              $timeout(function(){
                  $scope.thumbnailActiveClass = 'active';
              }, 200);
          }
          $scope.endChallenge = function(file){
              if(file){
                  $mdMenu.hide();
                  BierbendigerService.finishTodoEntry({file : file, entryId : $rootScope.$routeParams.todoId}).then(function(){
                      
                  });
              } else {
                  
              }
          }
          $scope.closePopup = function(){
              $mdMenu.hide();
          }
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
