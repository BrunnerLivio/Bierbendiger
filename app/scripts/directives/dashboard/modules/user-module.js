'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:userModule
 * @description
 * # userModule
 */
angular.module('bierbendigerApp')
    .directive('userModule', function () {
        return {
            templateUrl: 'views/templates/dashboard/modules/user-module.html',
            restrict: 'E',
            transclude: false,
            link: function postLink(scope, element, attrs) {
            },
            controller: function ($scope, $location, auth, BierbendigerService) {
                $scope.logout = function () {
                    auth.logout();
                    $location.path("/");
                }
                
                $scope.changePassword = function (form, oldPassword, newPassword) {
                    $scope.loadingStatus.changePassword = 1;
                    BierbendigerService.changePassword(oldPassword, newPassword).success(function (data) {
                        
                        if (data.Status) {
                            $scope.loadingStatus.changePassword = 2;
                            $scope.oldPW = "";
                            $scope.newPW = "";
                            form.$rollbackViewValue();
                            form.$setPristine();
                            form.$setUntouched();
                        } else {
                            $scope.loadingStatus.changePassword = 4;
                        }

                    }).catch(function () {
                        $scope.loadingStatus.changePassword = 3;
                    });
                };
                $scope.loadingStatus = {
                    changePassword: 0
                };

            }
        };
    });
