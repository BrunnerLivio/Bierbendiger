'use strict';

describe('Service: BierbendigerService', function () {

  // load the service's module
  beforeEach(module('bierbendigerApp'));

  // instantiate service
  var BierbendigerService;
  beforeEach(inject(function (_BierbendigerService_) {
    BierbendigerService = _BierbendigerService_;
  }));

  it('should do something', function () {
    expect(!!BierbendigerService).toBe(true);
  });

});
