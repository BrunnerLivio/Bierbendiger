/* global moment */
'use strict';

/**
 * @ngdoc overview
 * @name bierbendigerApp
 * @description
 * # bierbendigerApp
 *
 * Main module of the application.
 */
angular
  .module('bierbendigerApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'uiGmapgoogle-maps',
    'angular-linq',
    'ngFileUpload'
  ])
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider, $mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('DD.MM.YYYY');
    };
    $mdThemingProvider.theme('default')
    .primaryPalette('indigo', {
      'default': '400', 
      'hue-1': '100', 
      'hue-2': '600', 
      'hue-3': 'A100',
      
    })
    .accentPalette('yellow', {
        'default':'600',
    });
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
         requiresLogin: true
         
      })
      .when('/login', {
        templateUrl: 'views/main.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        requiresLogin:true,
        resolve: {
            createTodoEntry:function(){
                return false;
            },
            todoEntryDetail:function(){
                return false;
            }
        }
      })
      .when('/dashboard/create-todoentry', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl',
          controllerAs:'dashboard',
          requiresLogin:true,
          resolve: {
              createTodoEntry:function(){
                return true;
              },
              todoEntryDetail:function(){
                  return false;
              }
          }
      })
      .when('/dashboard/todoentry/:todoId', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl',
          controllerAs:'dashboard',
          requiresLogin:true,
          resolve: {
            createTodoEntry:function(){
                return false;
            },
            todoEntryDetail:function(){
                return true;
            }
          }
      })
      .when('/dashboard/todoentry/edit/:todoEditId', {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl',
          controllerAs:'dashboard',
          requiresLogin:true,
          resolve: {
              createTodoEntry:function(){
                return true;
              },
              todoEntryDetail:function(){
                  return false;
              }
          }
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  })
  .run(function($rootScope, auth, $location, $http){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      $rootScope.$on('$routeChangeStart', function(event, next) {
        if(next.requiresLogin){
          if (!auth.isAuthenticated()) {
              $location.path('/');
          }
        }
        
    
      });
  });
