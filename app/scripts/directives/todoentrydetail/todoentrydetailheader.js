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
            transclude: true,
            link: function postLink(scope, element, attrs) {
                if (scope.selectedEntry.media != null) {
                    var img = document.createElement('img');
                    var imagePath = "api/media/" + scope.selectedEntry.media.Id;
                    img.setAttribute('src', imagePath);
                    scope.pictureLoaded = false;
                    img.addEventListener('load', function () {
                        element.find(".loader").fadeOut();
                        element.find(".finishedHeader").css("background-image", "url(" + imagePath + ")");

                        var vib = $vibrant(img);
                        var $title = element.find(".title");
                        var $author = element.find(".author");
                        $title.css({
                            "border-bottom-color": "rgb(" + vib.Vibrant.rgb[0] + "," + vib.Vibrant.rgb[1] + "," + vib.Vibrant.rgb[2] + ")",
                        });
                        
                        $author.css({
                            "border-bottom-color": "rgb(" + vib.Muted.rgb[0] + "," + vib.Muted.rgb[1] + "," + vib.Muted.rgb[2] + ")",
                        });
                        $title.addClass("reveal");
                        window.setTimeout(function(){
                            $author.addClass("reveal");
                        }, 500);
                    });
                }

            }
        };
    });
