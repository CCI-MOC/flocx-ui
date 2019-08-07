(function () {
  'use strict';

  describe('Date Filter', function () {
    var utcToLocal, dateToUTC;

    beforeAll(function () {
      // Mock the Date object to use a constant time
      var baseTime = new Date(2019, 7, 2);
      jasmine.clock().install();
      jasmine.clock().mockDate(baseTime);
    });

    afterAll(function () {
      jasmine.clock().uninstall();
    });

    beforeEach(module('horizon.dashboard.project.flocx'));

    beforeEach(inject(function($filter) {
      utcToLocal = $filter('utcToLocal');
      dateToUTC = $filter('dateToUTC');
    }));

    it('filters should be defined', function () {
      expect(utcToLocal).toBeDefined();
      expect(dateToUTC).toBeDefined();
    });

    it('should mock native Date', function () {
      expect(new Date().toISOString()).toEqual('2019-08-02T04:00:00.000Z');
    });

    it('should convert date to UTC datetime string', function () {
      var date = new Date();
      var result = dateToUTC(date);
      expect(result).toEqual('2019-08-02 04:00:00');
    });

    it('should convert UTC date string to local time using the given format', function () {
      var date = new Date('2019-08-02T04:00:00.000Z'); // Note: 4:00 UTC time
      var localTime = utcToLocal(date, 'medium');
      expect(localTime).toEqual('Aug 2, 2019 12:00:00 AM');
    });
  });
}());
