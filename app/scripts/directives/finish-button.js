'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:finishButton
 * @description
 * # finishButton
 */
angular.module('bierbendigerApp')
  .directive('finishButton', function ($mdDialog, Upload, $mdMenu, $timeout, BierbendigerService, $rootScope) {
    var $element;
    function finish(){
        $element.find(".finish").addClass("finished");
    }
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
                      finish();
                  });
              } else {
                  
              }
          }
          $scope.closePopup = function(){
              $mdMenu.hide();
          }
      },

      link: function postLink(scope, element, attrs, ctrl) {
          $element = element;
          console.log(attrs.finished);
          if(attrs.finished != 0){
              finish();
          }
      }
    };
  });
