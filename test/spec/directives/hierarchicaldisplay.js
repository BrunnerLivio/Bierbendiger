'use strict';

describe('Directive: hierarchicalDisplay', function () {

  // load the directive's module
  beforeEach(module('bierbendigerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hierarchical-display></hierarchical-display>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hierarchicalDisplay directive');
  }));
});
