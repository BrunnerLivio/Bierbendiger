'use strict';

describe('Directive: todoListModule', function () {

  // load the directive's module
  beforeEach(module('bierbendigerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<todo-list-module></todo-list-module>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the todoListModule directive');
  }));
});
