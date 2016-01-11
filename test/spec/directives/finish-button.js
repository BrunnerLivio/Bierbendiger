'use strict';

describe('Directive: finishButton', function () {

  // load the directive's module
  beforeEach(module('bierbendigerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<finish-button></finish-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the finishButton directive');
  }));
});
