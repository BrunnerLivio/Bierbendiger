'use strict';

/**
 * @ngdoc service
 * @name bierbendigerApp.apiAddress
 * @description
 * # apiAddress
 * Factory in the bierbendigerApp.
 */
angular.module('bierbendigerApp')
  .factory('apiAddress', function () {

    return {
        bierbendiger: 
        {
            address:"http://localhost:8081/api/"
        },
        header:{
            Authorization: ""
        },
        googleGeocoding: {
            address:"https://maps.googleapis.com/maps/api/",
            key: "AIzaSyA6r9-4BZ-ijJHjJAp3m_zalpcjGDhgIBk" 
        }
    }
    
  });
