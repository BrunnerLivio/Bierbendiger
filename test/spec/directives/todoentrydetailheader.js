'use strict';

describe('Directive: todoentrydetailHeader', function () {

  // load the directive's module
  beforeEach(module('bierbendigerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<todoentrydetail-header></todoentrydetail-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the todoentrydetailHeader directive');
  }));
});
