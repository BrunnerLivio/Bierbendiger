'use strict';

describe('Service: googleGeocoding', function () {

  // load the service's module
  beforeEach(module('bierbendigerApp'));

  // instantiate service
  var googleGeocoding;
  beforeEach(inject(function (_googleGeocoding_) {
    googleGeocoding = _googleGeocoding_;
  }));

  it('should do something', function () {
    expect(!!googleGeocoding).toBe(true);
  });

});
