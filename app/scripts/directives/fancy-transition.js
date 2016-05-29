'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:newTodoentryButton
 * @description
 * # newTodoentryButton
 */
angular.module('bierbendigerApp')
    .directive('fancyTransition', function ($compile, $location) {
        var lastTopPosition;
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                function generateNewElement() {
                    var $newElement = $("<div></div>");
                    var background;
                    if (attributes.fancyTransitionBackground == undefined) {
                        background = element.css("background-color");
                    }
                    else {
                        background = attributes.fancyTransitionBackground;
                    }
                    $newElement.css({
                        "background-color": background,
                        "width": element.width() + "px",
                        "height": element.height() + "px",
                        "left": element.offset().left + "px",
                        "top": element.offset().top + "px",
                    });
                    $newElement.addClass("fancy-transition");
                    return $newElement;
                }
                scope.$watch(attributes.fancyTransition, function (value) {
                    var $fancyTransition = $(".fancy-transition");
                    if (value) {
                        element.children().fadeOut().promise().done(function () {
                            element.children().show();
                            element.children().css("visibility", "hidden");
                            var $newElement = generateNewElement();
                            $("body").append($newElement);

                            window.setTimeout(function () {
                                $newElement.addClass("fullscreen");
                                $newElement.css({
                                    "transform": "translate(-" + element.offset().left + "px, 0px)"
                                });
                                lastTopPosition = element.offset().top;
                                $newElement.css("top", $(document).scrollTop() + "px");

                                window.setTimeout(function () {
                                    $location.path(attributes.fancyTransitionPath);
                                    $newElement.addClass("fadeOut");
                                    window.setTimeout(function(){
                                        $newElement.remove();
                                    },300);
                                    scope.$apply();
                                }, 300);
                            }, 20);
                        });
                    } else if (!value && $fancyTransition.length > 0) {
                        var $includeElement = $fancyTransition.find(".include-element");
                        $includeElement.removeClass("faded");
                        window.setTimeout(function () {
                            $includeElement.remove();
                            $fancyTransition.removeClass("fullscreen");
                            console.log(element);
                            $fancyTransition.css({
                                "transform": "translate(0, " + lastTopPosition + "px)",
                                "width": element.width() + "px",
                                "height": element.height() + "px",
                            });
                            $(".container").css({ "overflow": "initial", "height": "auto" });
                            window.setTimeout(function () {
                                $fancyTransition.remove();
                                element.children().fadeIn();
                            }, 300);
                        }, 300);
                    }

                });
            }
        };
    });
