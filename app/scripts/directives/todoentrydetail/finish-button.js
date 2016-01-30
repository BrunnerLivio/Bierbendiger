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

        return {
            templateUrl: 'views/templates/todoentrydetail/finish-button.html',
            restrict: 'E',
            controller: function ($scope) {
                $scope.finished = false;
                $scope.file = {};
                $scope.openPopup = function ($mdOpenMenu, $event) {
                    if (!$scope.finished) {
                        if($scope.selectedEntry.ProofPhotoRequired == "1"){
                            
                                $mdOpenMenu($event);
                        } else {
                            var confirm = $mdDialog.confirm()
                            .clickOutsideToClose(true)
                            .title('Bisch sicher dass de Bitrag abgschlosse hesch?')
                            .textContent('Huere hesch du de abgschlosse, hesch doch eh zviel schiss')                        
                            .ariaLabel('Confirm')
                            .ok('Ja ichs gmacht')
                            .cancel('Ich bin en lügi bueb')
                            .targetEvent($event);
                            
                            $mdDialog.show(confirm).then(function() {
                                BierbendigerService.finishTodoEntryWithoutPicture({entryId: $rootScope.$routeParams.todoId }).then(function(data){
                                    $scope.finished = true;
                                });
                            });
                        
                        }
                    }
                }
                $scope.fileSelect = function () {
                    $timeout(function () {
                        $scope.thumbnailActiveClass = 'active';
                    }, 200);
                }
                $scope.endChallenge = function (file) {
                    if (file) {
                        $mdMenu.hide();
                        console.log($rootScope.$routeParams.todoId);
                        BierbendigerService.finishTodoEntry({ file: file, entryId: $rootScope.$routeParams.todoId }).then(function () {
                            $scope.finished = true;
                        });
                    } else {

                    }
                }
                $scope.closePopup = function () {
                    $mdMenu.hide();
                }
            },

            link: function postLink(scope, element, attrs, ctrl) {
                $element = element;
                if (attrs.finished != 0) {
                    scope.finished = true;
                }
            }
        };
    });
