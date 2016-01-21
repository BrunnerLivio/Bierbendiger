'use strict';

/**
 * @ngdoc service
 * @name bierbendigerApp.Vibration
 * @description
 * # Vibration
 * Factory in the bierbendigerApp.
 */
angular.module('bierbendigerApp')
  .factory('Vibration', function () {
    if ("vibrate" in navigator) {
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    }
    return {
      vibrate: function (ms) {
        if (navigator.vibrate) {
            navigator.vibrate(ms);
        }
      }
    };
  });
