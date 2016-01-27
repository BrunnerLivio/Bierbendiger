'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:galleryModule
 * @description
 * # galleryModule
 */
angular.module('bierbendigerApp')
  .directive('galleryModule', function () {
    return {
      templateUrl: 'views/templates/dashboard/modules/gallery-module.html',
      restrict: 'E',
      controller: function(BierbendigerService, $scope){
            BierbendigerService.getGalleryItems().then(function(data){
                $scope.galleryItems = data;
            }, function(error){
                
            });
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
