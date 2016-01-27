'use strict';

describe('Directive: galleryModule', function () {

  // load the directive's module
  beforeEach(module('bierbendigerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gallery-module></gallery-module>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the galleryModule directive');
  }));
});
