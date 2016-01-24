/* global ColorThief */
'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:todoentrydetailHeader
 * @description
 * # todoentrydetailHeader
 */
angular.module('bierbendigerApp')
    .directive('todoentrydetailHeader', function ($vibrant) {
        return {
            templateUrl: 'views/templates/todoentrydetail/todoentrydetailheader.html',
            restrict: 'E',
            transclude:true,
            link: function postLink(scope, element, attrs) {
                if (scope.selectedEntry.media != null) {
                    var img = document.createElement('img');
                    img.setAttribute('src', "api/media/" + scope.selectedEntry.media.Id);

                    img.addEventListener('load', function () {


                        var vib = $vibrant(img);
                        element.find(".title").css({
                            "border-bottom-color": "rgb(" + vib.Vibrant.rgb[0] + "," + vib.Vibrant.rgb[1] + "," + vib.Vibrant.rgb[2] + ")",
                        });
                        element.find(".destination").css({
                            "border-bottom-color": "rgb(" + vib.Muted.rgb[0] + "," + vib.Muted.rgb[1] + "," + vib.Muted.rgb[2] + ")",
                        });
                    });
                }

            }
        };
    });
