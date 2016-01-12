'use strict';

/**
 * @ngdoc directive
 * @name bierbendigerApp.directive:newTodoentryButton
 * @description
 * # newTodoentryButton
 */
angular.module('bierbendigerApp')
  .directive('fancyTransition', function ($compile) {
    var lastTopPosition;
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            
            scope.$watch(attributes.fancyTransition, function(value){
                var $fancyTransition = $(".fancy-transition");
                if(value){
                    $(".container").css("overflow", "hidden");
                    element.children().fadeOut().promise().done(function() {
                        var $newElement = $("<div></div>");
                        var background;
                        if(attributes.fancyTransitionBackground == undefined){
                            background = element.css("background-color");
                        }
                        else {
                            background = attributes.fancyTransitionBackground;
                        }
                        $newElement.css({
                            "background-color": background,
                            "width": element.css("width"),
                            "height": element.css("height"),
                            "left" : element.offset().left + "px",
                            "top": element.offset().top + "px",
                        });
                        $newElement.addClass("fancy-transition");
                        $("body").append($newElement);
                        window.setTimeout(function(){
                            $newElement.addClass("fullscreen");
                            lastTopPosition = $newElement.css("top");
                            $newElement.css("top", $(document).scrollTop() + "px");
                            window.setTimeout(function(){
                                var $includeElement = $("<div></div>");
                                $includeElement.addClass("include-element");
                                $newElement.append($includeElement);
                                $includeElement.attr("ng-include", attributes.fancyTransitionInclude);
                                $compile($includeElement)(scope);
                                scope.$apply();  
                                window.setTimeout(function(){
                                    $newElement.find(".include-element").addClass("faded");
                                    $(".container").css({"height": "0px"});
                                    $newElement.css("top","0px");
                                }, 20);
                            }, 500);
                        }, 20); 
                    });
                } else if(!value && $fancyTransition.length > 0){
                    var $includeElement = $fancyTransition.find(".include-element");
                    $includeElement.removeClass("faded");
                    window.setTimeout(function(){
                        $includeElement.remove();
                        $fancyTransition.removeClass("fullscreen");
                        $fancyTransition.css("top", lastTopPosition);
                        $(".container").css({"overflow":"auto", "height": "auto"});
                        window.setTimeout(function(){
                            $fancyTransition.remove();
                            element.children().fadeIn();
                        }, 500);
                    },500);
                }
                
            });
        }
    };
  });
