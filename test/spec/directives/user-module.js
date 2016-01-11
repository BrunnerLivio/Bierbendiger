'use strict';

describe('Directive: userModule', function () {

  // load the directive's module
  beforeEach(module('bierbendigerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-module></user-module>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the userModule directive');
  }));
});
