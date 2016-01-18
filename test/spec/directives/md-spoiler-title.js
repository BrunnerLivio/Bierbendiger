'use strict';

describe('Directive: mdSpoilerTitle', function () {

  // load the directive's module
  beforeEach(module('bierbendigerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<md-spoiler-title></md-spoiler-title>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mdSpoilerTitle directive');
  }));
});
