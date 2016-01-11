'use strict';

describe('Directive: messageOfTheDayModule', function () {

  // load the directive's module
  beforeEach(module('bierbendigerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<message-of-the-day-module></message-of-the-day-module>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the messageOfTheDayModule directive');
  }));
});
