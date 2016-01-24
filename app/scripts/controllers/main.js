'use strict';

/**
 * @ngdoc function
 * @name bierbendigerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bierbendigerApp
 */
angular.module('bierbendigerApp')
  .controller('MainCtrl', function ($scope, $mdDialog, $mdMedia, $location, auth, $mdToast, BierbendigerService) {
    $scope.viewId="MainCtrl";
    $scope.user = {};
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    var loginDialog;
    $scope.showLoginAlert = function(e){
       if(!auth.isAuthenticated()){
          loginDialog = $mdDialog.show({
                controller:function($scope){
                    $scope.failedLogin  = false;
                    $scope.login = function(){
                        $scope.failedLogin  = false;
                        auth.login($scope.user.name, $scope.user.password).then(function(data){
                            $location.path("/dashboard");
                            $mdToast.showSimple('Willkommä ' + data.user.Username);
                        }, function(){
                            $scope.failedLogin = true;
                        });
                    };
                },
                templateUrl: 'views/templates/login.html',
                parent: angular.element(document.body),
                targetEvent: e,
                clickOutsideToClose:true,
                fullscreen: $mdMedia('sm') && $scope.customFullscreen
            });
            $scope.$watch(function() {
                return $mdMedia('sm');
            }, function(sm) {
                $scope.customFullscreen = (sm === true);
            });  
       }
       else {
           $location.path("/dashboard");
       }
       
    }
    BierbendigerService.getUserCount().then(function(UserCount){
        $scope.UserCount = UserCount.amount; 
    });
    BierbendigerService.getUsers().then(function(users){
        console.log(users);
        $scope.users = users.data; 
    });
   $scope.$on("$destroy", function(){
     if(loginDialog != null) $mdDialog.hide( loginDialog, "finished" );
    });
    $scope.redirect = function(path){
      $location.path(path);
    }
    $scope.todaysYear = new Date().getFullYear();
  });
