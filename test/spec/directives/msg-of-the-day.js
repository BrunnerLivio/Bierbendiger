'use strict';

describe('Directive: msgOfTheDay', function () {

  // load the directive's module
  beforeEach(module('bierbendigerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<msg-of-the-day></msg-of-the-day>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the msgOfTheDay directive');
  }));
});
