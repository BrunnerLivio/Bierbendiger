'use strict';

describe('Service: Vibration', function () {

  // load the service's module
  beforeEach(module('bierbendigerApp'));

  // instantiate service
  var Vibration;
  beforeEach(inject(function (_Vibration_) {
    Vibration = _Vibration_;
  }));

  it('should do something', function () {
    expect(!!Vibration).toBe(true);
  });

});
