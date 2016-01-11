'use strict';

describe('Service: apiAddress', function () {

  // load the service's module
  beforeEach(module('bierbendigerApp'));

  // instantiate service
  var apiAddress;
  beforeEach(inject(function (_apiAddress_) {
    apiAddress = _apiAddress_;
  }));

  it('should do something', function () {
    expect(!!apiAddress).toBe(true);
  });

});
