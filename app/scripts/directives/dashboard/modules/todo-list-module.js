'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:todoListModule
 * @description
 * # todoListModule
 */
angular.module('bierbendigerApp')
    .directive('todoListModule', function () {
        return {
            templateUrl: 'views/templates/dashboard/modules/todo-list-module.html',
            restrict: 'E',
            transclude: false,
            link: function postLink(scope, element, attrs) {

            },
            controller: function (BierbendigerService, $scope, $rootScope, $linq, $location) {

                function updateTodoEntries() {
                    BierbendigerService.getTodoEntries().then(function (entries) {
                        $scope.entries = entries;
                        if ($rootScope.$routeParams.todoId) {
                            var entry = $linq.Enumerable().From($scope.entries)
                                .Where(function (x) {
                                    return x.Id == $rootScope.$routeParams.todoId;
                                })
                                .First();
                            entry.IsOpen = true;
                        } else {
                            if ($scope.entries != undefined) {
                                angular.forEach($scope.entries, function (entry) {
                                    entry.IsOpen = false;
                                });
                            }
                        }
                    });
                }
                function openEntry(entry) {
                    $location.path("/dashboard/todoentry/" + entry.Id);
                }

                $scope.openEntry = openEntry;
                $rootScope.$on('todoEntriesUpdated', function () {
                    updateTodoEntries();
                });
                $scope.vote = function(upVote, entry){
                    entry.Karma = upVote ? ++entry.Karma : --entry.Karma;
                    console.log(upVote);
                    entry.HasUserUpVoted = upVote;
                    BierbendigerService.voteTodoEntry(upVote, entry.Id).success(function(){
                        
                    });
                }
                updateTodoEntries();
            }
        };
    });
