'use strict';

describe('Controller: TodoentrydetailCtrl', function () {

  // load the controller's module
  beforeEach(module('bierbendigerApp'));

  var TodoentrydetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodoentrydetailCtrl = $controller('TodoentrydetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TodoentrydetailCtrl.awesomeThings.length).toBe(3);
  });
});
